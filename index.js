import jQuery from 'jquery';
import Bacon from 'baconjs';
import BaconUI from 'baconui';


// let textFieldValue = (textField) =>
//   textField.asEventStream('keyup').map(() => textField.val()).toProperty('');


let username = BaconUI.textFieldValue($('input[name=username]'));
let fullname = BaconUI.textFieldValue($('input[name=fullname]'));

// let and = (a, b) => a && b

let nonEmpty = x => x.length > 0

let usernameEntered = username.map(nonEmpty);
let fullnameEntered = fullname.map(nonEmpty);

let setEnabled = (element, enabled) => element.attr('disabled', !enabled);

let buttonEnabled = usernameEntered.and(fullnameEntered);
buttonEnabled.assign(setEnabled, $('button'))
