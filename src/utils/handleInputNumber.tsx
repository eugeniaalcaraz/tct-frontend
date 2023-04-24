export const handleInputNumber = (e) => {
    const event = e || window.event;

    const keyCode = event.keyCode || event.which;
    const key = String.fromCharCode(keyCode);

    if (key.length == 0) return;

    const regex = /^[0-9.,\b]+$/;
    if (keyCode == 188 || keyCode == 190 || keyCode === 9) {
        return;
    } else {
        if (!regex.test(key)) {
            event.returnValue = false;
            if (event.preventDefault) event.preventDefault();
        }
    }
};
