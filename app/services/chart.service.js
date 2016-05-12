module.exports = function()
{
    this.charts = {};
    
    this.createChart = function(name, model)
    {
        this.charts[name] = {
            model: model,
            type: 'default'
        };
        
        return this.getChart(name);
    };
    
    // this is either a bit clever or really stupid
    this.getChart = function(name)
    {
        var self = this;
        
        return {
            getModel: function()
            {
                return self.getModel(name);
            },
            
            getType: function()
            {
                return self.getType(name);
            },
            
            setType: function(type)
            {
                return self.setType(name, type);
            }
        };
    };
    
    this.setType = function(name, type)
    {
        this.charts[name].type = type;
    };
    
    this.getType = function(name)
    {
        return this.charts[name].type;
    };
    
    this.getModel = function(name)
    {
        return this.charts[name].model;
    };
};
