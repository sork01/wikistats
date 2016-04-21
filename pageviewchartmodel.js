/**
 * Pageviews chart data model.
 *
 * @author Mikael Forsberg <miforsb@kth.se>
 * @version 20160421T0822
 */
function pageviewChartModel()
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
    
    // "constructor" ends
    
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
        
        this.dateRangeFrom = from;
        this.dateRangeTo = to;
        
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
    }
    
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
        var stop = this.dateRangeTo.getTime();
        
        while (at.getTime() < stop)
        {
            values.push(new Date(at));
            at.setDate(at.getDate() + 1);
        }
        
        return values;
    };
};
