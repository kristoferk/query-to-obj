describe("queryToObj", function () {
    beforeEach(function() {
        this.inputSimple = "Id=1&Name=Test&Name=Test2&Name=Test3&Sub.Test.Inner=2&Sub.Test.InnerB=3";
        this.inputDecode = "Id=1&Encoded=%C3%A5";
        this.inputCast = "Id=1&Money=3.5&Money2=3,5&Number=4&Setting=true&Setting2=False";
        this.inputSkip = "Id=1&Skip=";
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

    it("decode", function() {
        var value = queryToObj(this.inputDecode, {decode: true, skipCast: true});
        var obj = {
            Id: '1',
            Encoded: 'å'
        };

        chai.expect(JSON.stringify(obj)).to.equal(JSON.stringify(value));
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

});