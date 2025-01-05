<?php
session_start(); // Inicia la sesión

// Verifica si el carrito existe en la sesión, si no, lo inicializa
if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

// Verifica si el formulario envió datos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
    $titulo = filter_input(INPUT_POST, 'titulo', FILTER_SANITIZE_STRING);

    // Verifica si los datos son válidos
    if ($id && $titulo) {
        // Crea un nuevo elemento del carrito
        $libro = [
            'id' => $id,
            'titulo' => $titulo,
        ];

        // Agrega el libro al carrito
        $_SESSION['carrito'][] = $libro;

        // Redirige al usuario a una página de confirmación o de regreso al detalle del libro
        header("Location: /Index-HTML/Index.html?mensaje=Libro agregado al carrito");
        exit;
    } else {
        // Redirige en caso de error
        header("Location: /Index-HTML/Index.html?error=Datos inválidos");
        exit;
    }
}
?>
