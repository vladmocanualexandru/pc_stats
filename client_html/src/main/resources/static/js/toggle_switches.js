function controlToggleActionDispatcher(t){
    let jt = $(t);
    let id = jt.attr("id");
    let input = jt.children("input");
    let value = input.val()=="true";

    value = !value;
        
    input.val(value);
    jt.children("img").attr("src", `/pcstats_client/images/${theme}/toggle_switch_${value?'on':'off'}.png`);

    switch (id) {
        case 'anim': {
            if (value) {
                $(".dial-container").addClass("animated");
            } else {
                $(".dial-container").removeClass("animated");
            }

            break;
        }
        case 'rec': {
            recMinMax = value;
            break;
        }
        default: {
            console.log(`Untreated action for toggle type '${id}'`);
        }
    }
}