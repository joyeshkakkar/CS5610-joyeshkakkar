function convertTime(ms)
{
    alert(ms);
    var ms = ms;
    ms = 1000 * Math.round(ms / 1000); // round to nearest second
    var d = new Date(ms);
    console.log(d.getUTCMinutes() + ':' + d.getUTCSeconds()); // "4:59"
}