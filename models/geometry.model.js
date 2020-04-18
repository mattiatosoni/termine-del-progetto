module.exports = class Geometry {
    constructor(id, geometry) {
        this.type = "Feature";
        this.properties = new Properties(id);
        this.geometry = geometry;
    }
}

class Properties
{
    constructor(id)
    {
        this.id = id;
    }
}