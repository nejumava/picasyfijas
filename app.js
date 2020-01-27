// Inicio de juego
var randomDigit, numberInput, picas, fijas, content;
game();

// Evento Enter
$('#digits').on('keypress', function (e) {
    if (e.keyCode == 13) {
        // Validación de digitos
        if ($(this).val() == "" || $(this).val().length < 4 || validateInput($(this).val())) {
            $('span').css('color', 'red');
            return false;
        } else {
            $('span').css('color', 'black');
            numberInput = $(this).val();
            validateDigits();
            $(this).val('');
        }
    }
});

// Botón jugar nuevamente
$('#jugar').on('click', function () {
    game();
});

function game() {
    randomDigit = numberRandom();
    $('#digits').focus();
    $('#digits').val('');
    $('#data').find('tr.info').remove();
    $('table').css('display', 'none');
    $('#ganaste').hide();
    console.log(randomDigit);
}

// Función con retorno de número aleatorio
function numberRandom() {
    let lista = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    lista = lista.sort(function () { return Math.random() - 0.5 });
    return lista.toString().replace(',', '').replace(',', '').replace(',', '').substring(0, 4);
}

// Valida que los números ingresados no sean repetidos
function validateInput(n) {
    let c = n.toString();
    for (var t = 0; t < c.length; t++) {
        for (var y = 0; y < c.length; y++) {
            if (t != y) {
                if (c[t] == c[y]) {
                    // Número repetido
                    return true;
                }
            }
        }
    }

    return false;
}

// Método que indica picas y fijas
function validateDigits() {
    let c = numberInput.toString();
    let r = randomDigit.toString();
    picas = 0;
    fijas = 0;

    // Compara uno a uno el número ingresado con el número aleatorio
    for (var i = 0; i < c.length; i++) {
        for (var j = 0; j < r.length; j++) {
            if (c[i] == r[j]) {
                if (i == j) {
                    fijas++;
                } else {
                    picas++;
                }
            }
        }
    }

    // Muestra el mensaje de ganaste!
    if (fijas == 4) {
        $('#ganaste').show();
    } else {
        // Adiciona a la tabla
        $('table').css('display', 'inline-table');
        content = '<tr class="info"><td>' + c + '</td><td>' + picas + '</td><td>' + fijas + '</td></tr>'
        $('table tbody').append(content);
    }
}