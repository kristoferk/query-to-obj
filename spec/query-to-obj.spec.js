describe("queryToObj", function () {
    beforeEach(function() {
        this.inputSimple = "Id=1&Name=Test&Name=Test2&Name=Test3&Sub.Test.Inner=2&Sub.Test.InnerB=3";
        this.inputValueCase = "Id=1&Name=TestTest&List=TestTest&List=TestTest&Sub.Test.InnerB=Test";
        this.inputDecode = "Id=1&Encoded=%C3%A5";
        this.inputCast = "Id=1&Money=3.5&Money2=3,5&Number=4&Setting=true&Setting2=False";
        this.inputSkip = "Id=1&Skip=";
        this.inputCamelCase = "TestId=1&Test_Id=2&CamelCase_camel_case=true&NestedObj.SubValue=2&NestedObj.Snake_Value=4";
        this.inputSnakeCase = "TestObjId=1&test_Obj_Id=2&TestObjId=3&camelCase_CamelCase=true&NestedObj.SubValue=2&nestedObj.snakeValue=4";
        this.inputPascalCase = "testObjId=1&test_obj_Id=2&TestObjId=3&camelCase_camel_case=true&NestedObj.SubValue=2&nestedObj.snake_Value=4";
        this.inputDecodeKey = "bl%40h=blah";
        this.inputDecodeKeyNested = "test.bl%2540h=blah";
    });

    it("default", function() {
        var value = queryToObj(this.inputSimple);
        var obj = {
            Id: 1,
            Name: ['Test', 'Test2', 'Test3'],
            Sub: {
                Test: {
                    Inner:2,
                    InnerB:3
                }
            }
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("lowercase", function() {
        var value = queryToObj(this.inputValueCase, { valueCase: 'LowerCase'});
        var obj = {
            Id: 1,
            Name: 'testtest',
            List: ['testtest', 'testtest'],            
            Sub: {
                Test: {
                    InnerB:'test'
                }
            }
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("UPPERCASE", function() {
        var value = queryToObj(this.inputValueCase, { valueCase: 'UpperCase'});
        var obj = {
            Id: 1,
            Name: 'TESTTEST',
            List: ['TESTTEST', 'TESTTEST'],            
            Sub: {
                Test: {
                    InnerB:'TEST'
                }
            }
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("decode", function() {
        var value = queryToObj(this.inputDecode, {decode: true, skipCast: true});
        var obj = {
            Id: '1',
            Encoded: 'å'
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("decodeKey", function () {
        var value = queryToObj(this.inputDecodeKey, { decode: true, skipCast: true });
        
        for (var v in value) {
            chai.expect("bl@h").to.equal(v);
        }
    });

    it("decodeKeyNested", function () {
        var value = queryToObj(this.inputDecodeKeyNested, { decode: true, skipCast: true });

        for (var v in value.test) {
            chai.expect("bl%40h").to.equal(v);
        }
    });
    
    it("cast", function() {
        var value = queryToObj(this.inputCast);
        var obj = {
            Id: 1,
            Money: 3.5,
            Money2: '3,5',
            Number: 4,
            Setting: true,
            Setting2: false,
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("skip", function() {
        var value = queryToObj(this.inputSkip, {skipEmptyValues: true});
        var obj = {
            Id: 1
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("camelCase", function() {
        var value = queryToObj(this.inputCamelCase, {skipEmptyValues: true, keyCase: 'camelCase'});
        var obj = {
            testId: [ 1, 2 ],
            camelCaseCamelCase: true,
            nestedObj: {
                subValue: 2,
                snakeValue: 4
            }
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("PascalCase", function() {
        var value = queryToObj(this.inputPascalCase, { skipEmptyValues: true, keyCase: 'PascalCase' });
        var obj = {
            TestObjId: [ 1, 2, 3 ],
            CamelCaseCamelCase: true,
            NestedObj: {
                SubValue: 2,
                SnakeValue: 4
            }
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("Snake_Case", function() {
        var value = queryToObj(this.inputSnakeCase, {skipEmptyValues: true, keyCase: 'snake_case'});
        var obj = {
            test_obj_id: [ 1, 2, 3 ],
            camel_case_camel_case: true,
            nested_obj: {
                sub_value: 2,
                snake_value: 4
            }

        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
    });

    it("decodeKey", function () {
        var value = queryToObj(this.inputDecodeKey, { decode: true, skipCast: true });        
        chai.expect(value['bl@h']).to.equal('blah');
    });

    it("decodeKeyNested", function () {
        var value = queryToObj(this.inputDecodeKeyNested, { decode: true, skipCast: true });
        chai.expect(value.test['bl%40h']).to.equal('blah');
    });
});