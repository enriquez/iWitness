describe("TwitterResult", function() {
  var result, entities;
  describe("contentSrc", function() {
    beforeEach(function() {
      entities = {urls: []};
      result = IWitness.TwitterResult.create({entities: entities});
    });

    it("returns nothing when no entities", function() {
      expect(result.get("contentSrc")).toBeFalsy();
    });

    it("returns an instagram url", function() {
      entities.urls.push({expanded_url: "http://instagr.am/p/HxOi-1wLe_/"});
      expect(result.get("contentSrc")).toEqual("http://instagr.am/p/HxOi-1wLe_/media/?size=m");
    });

    it("returns a twitpic url", function() {
      entities.urls.push({expanded_url: "http://twitpic.com/8s7vs5"});
      expect(result.get("contentSrc")).toEqual("http://twitpic.com/show/large/8s7vs5");
    });

    describe("twitter media links", function() {
      it("returns photo media url", function() {
        entities.media = [{media_url: "https://p.twimg.com/AnSXE5FCEAAG5HJ.jpg", type: "photo"}]
        expect(result.get("contentSrc")).toEqual("https://p.twimg.com/AnSXE5FCEAAG5HJ.jpg:small");
      });

      it("does not return non-photo media", function() {
        entities.media = [{media_url: "https://p.twimg.com/AnSXE5FCEAAG5HJ.mov", type: "vid"}]
        expect(result.get("contentSrc")).toBeFalsy();
      });
    });
  });

  describe("contentLink", function() {
    var result, entities;

    beforeEach(function() {
      entities = {urls: []};
      result = IWitness.TwitterResult.create({entities: entities});
    });

    it("returns an instagram url", function() {
      entities.urls.push({expanded_url: "http://instagr.am/p/HxOi-1wLe_/"});
      expect(result.get("contentLink")).toEqual("http://instagr.am/p/HxOi-1wLe_/");
    });

    it("returns a twitpic url", function() {
      entities.urls.push({expanded_url: "http://twitpic.com/8s7vs5"});
      expect(result.get("contentLink")).toEqual("http://twitpic.com/8s7vs5");
    });

    it("returns photo media url", function() {
      entities.media = [{media_url: "https://p.twimg.com/AnSXE5FCEAAG5HJ.jpg", type: "photo", url: "pic.twitter.com/lmFTHAoZ"}]
      expect(result.get("contentLink")).toEqual("pic.twitter.com/lmFTHAoZ");
    });
  });
});