$(function () {
    $(".acunity").click(addContentACUnity);
    $(".cod").click(addContentCOD);
    $(".crysis").click(addContentCrysis);
    $("h1").click(function (event) {
        console.log(event);
    });
    function addContentACUnity() {
        $(".content").empty().html(
              $("div").filter(".ACUnityText").attr("contenteditable", true));
    }
    function addContentCOD() {
        $(".content").empty().html(
                      $(".CODText").attr("contenteditable", true));
    }
    function addContentCrysis() {
        $(".content").empty().html(
                      $(".CrysisText").attr("contenteditable", true));
    }
});