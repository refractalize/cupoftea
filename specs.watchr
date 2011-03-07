def test(spec)
    system('clear')
    system("node #{spec}")
end

class CodeSpecMap
    def initialize
        @mappers = []
    end

    def add_map(mapper)
        @mappers.push(mapper)
    end

    def find_spec_for(code)
        p @mappers
        @mappers.each do |mapper|
            puts 'finding spec for: ' + code
            found_spec = mapper.spec_for(code)
            return found_spec if found_spec
        end

        # code must be the spec!
        code
    end
end

class OneToOneMap
    def initialize(code, spec)
        @code = code
        @spec = spec
    end

    def spec_for(code)
        @spec if code === @code
    end
end

$mappers = CodeSpecMap.new

def code_spec(code, spec)
    $mappers.add_map(OneToOneMap.new(code, spec))
end

code_spec('loopback.js', 'test.js')
code_spec('cupoftea.js', 'cupoftea_test.js')

watch '.*' do |code|
    test($mappers.find_spec_for(code[0]))
end

test('cupoftea_test.js')
