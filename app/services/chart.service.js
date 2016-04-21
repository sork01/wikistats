module.exports = function()
{
    this.charts = {};
    
    this.createChart = function(name, model)
    {
        this.charts[name] = model;
        return model;
    };
    
    this.getChart = function(name)
    {
        return this.charts[name];
    };
};
