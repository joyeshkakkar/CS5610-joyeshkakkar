$(function () {
    $(".acunity").click(addContentACUnity);
    $(".cod").click(addContentCOD);
    $(".crysis").click(addContentCrysis);
    $("h1").click(function (event) {
        console.log(event);
    });
    function addContentACUnity() {
        $(".content").empty().html(
              $("div").filter(".ACUnityText").html());
    }
    function addContentCOD() {
        $(".content").empty().html(
                      $(".CODText").html());
    }
    function addContentCrysis() {
        $(".content").empty().html(
                      $(".CrysisText").html());
    }
});