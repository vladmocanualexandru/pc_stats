function toggleSwitchClick(t){
    let jt = $(t);
    let input = jt.children("input");
    let value = input.val()=="true";

    value = !value;

    input.val(value);
    jt.children("img").attr("src", `/pcstats_client/images/toggle_switch_${value?'on':'off'}.png`);

    input.trigger( "change", [ input ] );
}