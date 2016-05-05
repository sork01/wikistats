/**
 * Pageviews chart data model.
 *
 * @author Mikael Forsberg <miforsb@kth.se>
 * @version 20160502T2001
 */
module.exports = function()
{
    /**
     * Date range starting date.
     */
    this.dateRangeFrom = new Date();
    
    /**
     * Date range ending date.
     */
    this.dateRangeTo = new Date();
    
    /**
     * Y-value data sets.
     */
    this.datasets = {};
    
    // "constructor" begins
    
    this.dateRangeFrom.setUTCHours(0);
    this.dateRangeFrom.setUTCMinutes(0);
    this.dateRangeFrom.setUTCSeconds(0);
    this.dateRangeFrom.setUTCMilliseconds(0);
    
    this.dateRangeTo.setUTCHours(0);
    this.dateRangeTo.setUTCMinutes(0);
    this.dateRangeTo.setUTCSeconds(0);
    this.dateRangeTo.setUTCMilliseconds(0);
    
    // default date range is one week ending at today's date
    this.dateRangeFrom.setDate(this.dateRangeFrom.getDate() - 7);
    
    // create event slots
    this.events = [
        ['daterangechanged'],
        ['datasetadded'],
        ['datasetremoved'],
        ['datasetscleared'],
        ['exportclicked']
    ];
    
    // "constructor" ends
    
    /**
     * Search for and potentially return a named event.
     * 
     * @param String which Name of event
     * @access private
     * @return Array if event exists, null otherwise
     */
    this.findEvent = function(which)
    {
        var event = null;
        
        for (var i in this.events)
        {
            if (this.events[i][0] == which)
            {
                event = this.events[i];
                break;
            }
        }
        
        return event;
    };
    
    /**
     * Fire a named event, calling all registered handlers.
     * 
     * @param String which Name of event
     * @param Object data Data to pass to handlers
     * @access private
     * @return void
     */
    this.dispatchEvent = function(which, data)
    {
        var event = this.findEvent(which);
        
        if (event)
        {
            for (k = 1; k < event.length; ++k)
            {
                event[k](data);
            }
        }
    };
    
    /**
     * Register an event handler to a named event.
     * 
     * @param String which Name of event
     * @param Function fn Event handler callback function
     * @return void
     */
    this.addEventListener = function(which, fn)
    {
        var event = this.findEvent(which);
        
        if (event)
        {
            event.push(fn);
        }
    };
    
    /**
     * Set the date range. The starting date must be an earlier date
     * than the ending date for the range to be considered valid.
     *
     * @param Date from Start of date range
     * @param Date to End of date range
     * @return Boolean True if given a valid range, False otherwise.
     */
    this.setDateRange = function(from, to)
    {
        if (from.getTime() >= to.getTime())
        {
            return false;
        }
        
        var signalEvent = (from.getTime() != this.dateRangeFrom.getTime() || to.getTime() != this.dateRangeTo.getTime());
        
        this.dateRangeFrom = from;
        this.dateRangeTo = to;
        
        if (signalEvent)
        {
            this.dispatchEvent('daterangechanged', null);
        }
        
        return true;
    };
    
    /**
     * Add a Y-value dataset. There must be one numeric value in yValues
     * for each distinct date contained in the current date range, and the
     * values must be in chronological order. 
     *
     * @param String name Name of new dataset
     * @param Array yValues Array of numeric Y-values
     * @return void
     */
    this.addDataset = function(name, yValues)
    {
        this.datasets[name] = yValues;
        this.dispatchEvent('datasetadded', name);
    };
    
    /**
     * Remove a dataset.
     *
     * @param String name Name of dataset to remove
     * @return void
     */
    this.removeDataset = function(name)
    {
        delete this.datasets[name];
        this.dispatchEvent('datasetremoved', name);
    };
    
    /**
     * Remove all datasets.
     *
     * @return void
     */
    this.clearDatasets = function()
    {
        this.datasets = {};
        this.dispatchEvent('datasetscleared', null);
    };

    /**
     * Export the graph
     *
     * @param String mime-type of the export format
     * @return void
     */
    this.exportgraph = function(mime)
    {
        this.dispatchEvent('exportclicked', mime);
    };

    /**
     * Retrieve a datasets.
     *
     * @return Object
     */
    this.getDataset = function(name)
    {
        return this.datasets[name];
    };
    
    /**
     * Retrieve all datasets.
     *
     * @return Object
     */
    this.getDatasets = function()
    {
        return this.datasets;
    };
    
    /**
     * Retrieve the X-axis "values" or "tick labels", i.e. the
     * distinct dates contained in the current date range.
     * 
     * @return Date[]
     */
    this.getXAxisValues = function()
    {
        var values = [];
        
        var at = new Date(this.dateRangeFrom);
        var stop = new Date(this.dateRangeTo.getTime() + 1);
        
        while (at.getTime() <= stop)
        {
            values.push(new Date(at).toISOString().slice(0, 10));
            at.setDate(at.getDate() + 1);
        }
        
        return values;
    };
};
