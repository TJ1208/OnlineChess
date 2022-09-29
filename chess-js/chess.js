
function generateBoard() {
    for (let r = 0; r < 8; r++) {
        let row = document.createElement('tr');
        for (let c = 0; c < 8; c++) {
            let button = document.createElement('button');
            button.setAttribute('class', 'chess-btn ' + (c + (r * 8)))
            if (r % 2 == 0) {
                if (c % 2 == 0 && r % 2 == 0) {
                    button.style.backgroundColor = "white";
                } else {
                    button.style.backgroundColor = "gray";
                }
            } else {
                if (c % 2 == 1 || r % 2 == 0) {
                    button.style.backgroundColor = "white";
                } else {
                    button.style.backgroundColor = "gray";
                }
            }

            let image = document.createElement("em");
            image.setAttribute("id", "empty");
            button.appendChild(image);
            row.appendChild(button);
            let body = document.getElementsByTagName("tbody")[0];
            body.appendChild(row);
        }
    }
    placePawns();
    loadWhiteSide();
    loadBlackSide();
}

function placePawns() {
    for (let r = 8; r < 16; r++) {
        document.getElementsByTagName("em")[r].setAttribute("class", "fa-solid fa-chess-pawn black start " + r);
    }
    for (let r = 48; r < 56; r++) {
        document.getElementsByTagName("em")[r].setAttribute("class", "fa-regular fa-chess-pawn white start " + r);
    }

}

function loadBlackSide() {
    document.getElementsByTagName("em")[0].setAttribute("class", "fa-solid fa-chess-rook black 0");
    document.getElementsByTagName("em")[7].setAttribute("class", "fa-solid fa-chess-rook black 7");
    document.getElementsByTagName("em")[2].setAttribute("class", "fa-solid fa-chess-bishop black 2");
    document.getElementsByTagName("em")[5].setAttribute("class", "fa-solid fa-chess-bishop black 5");
    document.getElementsByTagName("em")[1].setAttribute("class", "fa-solid fa-chess-knight black 1");
    document.getElementsByTagName("em")[6].setAttribute("class", "fa-solid fa-chess-knight black 6");
    document.getElementsByTagName("em")[3].setAttribute("class", "fa-solid fa-chess-queen black 3");
    document.getElementsByTagName("em")[4].setAttribute("class", "fa-solid fa-chess-king black 4");
}

function loadWhiteSide() {
    document.getElementsByTagName("em")[63].setAttribute("class", "fa-regular fa-chess-rook white 63");
    document.getElementsByTagName("em")[56].setAttribute("class", "fa-regular fa-chess-rook white 56");
    document.getElementsByTagName("em")[58].setAttribute("class", "fa-regular fa-chess-bishop white 58");
    document.getElementsByTagName("em")[61].setAttribute("class", "fa-regular fa-chess-bishop white 61");
    document.getElementsByTagName("em")[57].setAttribute("class", "fa-regular fa-chess-knight white 57");
    document.getElementsByTagName("em")[62].setAttribute("class", "fa-regular fa-chess-knight white 62");
    document.getElementsByTagName("em")[59].setAttribute("class", "fa-regular fa-chess-queen white 59");
    document.getElementsByTagName("em")[60].setAttribute("class", "fa-regular fa-chess-king white 60");
}

function resetColors() {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let button = document.getElementsByTagName("button")[c + (r * 8)];
            if (r % 2 == 0) {
                if (c % 2 == 0 && r % 2 == 0) {
                    button.style.backgroundColor = "white";
                } else {
                    button.style.backgroundColor = "gray";
                }
            } else {
                if (c % 2 == 1 || r % 2 == 0) {
                    button.style.backgroundColor = "white";
                } else {
                    button.style.backgroundColor = "gray";
                }
            }
        }
    }
}

window.onload = generateBoard();

document.addEventListener('click', function (e) {
    e = window.event;
    console.log(e);
    elemClass = e.target.className;
    console.log(elemClass);
    if (elemClass.indexOf("fa-chess-pawn") != -1) {
        resetColors();
        localStorage.setItem("lastPiece", elemClass);
        showPawnMoves(elemClass);
    } else if (elemClass.indexOf("fa-chess-rook") != -1) {
        resetColors();
        localStorage.setItem("lastPiece", elemClass);
        showRookMoves(elemClass);
    } else if (elemClass.indexOf("fa-chess-knight") != -1) {
        resetColors();
        localStorage.setItem("lastPiece", elemClass);
        showKnightMoves(elemClass);
    } else if (elemClass.indexOf("fa-chess-bishop") != -1) {
        resetColors();
        localStorage.setItem("lastPiece", elemClass);
        showBishopMoves(elemClass);
    } else if (elemClass.indexOf("fa-chess-queen") != -1) {
        resetColors();
        localStorage.setItem("lastPiece", elemClass);
        showBishopMoves(elemClass);
        showRookMoves(elemClass);
    } else if (elemClass.indexOf("fa-chess-king") != -1) {
        resetColors();
        localStorage.setItem("lastPiece", elemClass);
        showKingMoves(elemClass);
    }

    if (e.target.style.backgroundColor == "red") {
        movePiece(e);
    }

});

function showPawnMoves(elemClass) {
    position = parseInt(elemClass.substr(-2, 2).trim());
    if (position + 9 < 64) {
        if (elemClass.indexOf("black") != -1) {
            if (document.getElementsByTagName("em")[position + 7].className.indexOf("white") != -1 && position % 8 != 0) {
                document.getElementsByTagName("button")[position + 7].style.backgroundColor = "red";

            }

            if ((document.getElementsByTagName("em")[position + 9].className.indexOf("white") != -1) && (position + 9) % 8 != 0) {
                document.getElementsByTagName("button")[position + 9].style.backgroundColor = "red";

            }

            if (!(document.getElementsByTagName("em")[position + 8].className.indexOf("fa") != -1)) {
                document.getElementsByTagName("button")[position + 8].style.backgroundColor = "red";
            } else {
                return;
            }
        }
    }
    if (position - 9 > 0) {
        if (elemClass.indexOf("white") != -1) {
            if (document.getElementsByTagName("em")[position - 7].className.indexOf("black") != -1 && (position - 7) % 8 != 0) {
                document.getElementsByTagName("button")[position - 7].style.backgroundColor = "red";

            }
            if (document.getElementsByTagName("em")[position - 9].className.indexOf("black") != -1 && position % 8 != 0) {
                document.getElementsByTagName("button")[position - 9].style.backgroundColor = "red";

            }
            if (!(document.getElementsByTagName("em")[position - 8].className.indexOf("fa") != -1)) {
                document.getElementsByTagName("button")[position - 8].style.backgroundColor = "red";
            } else {
                return;
            }
        }
    }

    if (elemClass.indexOf("start") != -1) {
        if (elemClass.indexOf("black") != -1) {
            if (!(document.getElementsByTagName("em")[position + 16].className.indexOf("white") != -1)) {
                document.getElementsByTagName("button")[position + 16].style.backgroundColor = "red";
            }
        }
        if (elemClass.indexOf("white") != -1) {
            console.log(document.getElementsByTagName("em")[position - 16].className.indexOf("fa"))
            if (!(document.getElementsByTagName("em")[position - 16].className.indexOf("black") != -1)) {
                document.getElementsByTagName("button")[position - 16].style.backgroundColor = "red";
            }
        }
    }
}

function showRookMoves(elemClass) {
    position = parseInt(elemClass.substr(-2, 2).trim());
    chessColor = "black";
    MAX_LENGTH = 64;
    MIN_LENGTH = 0;
    if (elemClass.indexOf("black") != -1) {
        chessColor = "white";
    }
    // North Direction
    for (i = position - 8; i >= MIN_LENGTH; i -= 8) {
        if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[i].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            break;
        } else {
            break;
        }
    }
    // East Direction
    if (position % 8 != 7) {
        for (i = position + 1; i <= MAX_LENGTH; i++) {
            if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
                break;
            } else {
                break;
            }
            if (i % 8 == 7) {
                break;
            }
        }
    }

    // South Direction
    for (i = position + 8; i <= MAX_LENGTH; i += 8) {
        if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[i].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            break;
        } else {
            break;
        }
    }
    // West Direction
    if (position % 8 != 0) {
        for (i = position - 1; i >= MIN_LENGTH; i--) {

            if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
                break;
            } else {
                break;
            }
            if (i % 8 == 0) {
                break;
            }
        }
    }

}

function showBishopMoves(elemClass) {
    position = parseInt(elemClass.substr(-2, 2).trim());
    chessColor = "black";
    MAX_LENGTH = 64;
    MIN_LENGTH = 0;
    if (elemClass.indexOf("black") != -1) {
        chessColor = "white";
    }
    // North Direction
    if (position % 8 < 6)
        for (i = position - 7; i >= MIN_LENGTH; i -= 7) {
            if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
                break;
            } else {
                break;
            }
            if (i % 8 == 7) {
                break;
            }
        }
    // East Direction
    if (position % 8 != 0) {
        for (i = position - 9; i >= MIN_LENGTH; i -= 9) {
            if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
                break;
            } else {
                break;
            }
            if (i % 8 == 0) {
                break;
            }
        }
    }

    // South Direction
    if (position % 8 != 7) {
        for (i = position + 9; i <= MAX_LENGTH; i += 9) {
            if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
                break;
            } else {
                break;
            }
            if (i % 8 == 7) {
                break;
            }
        }
    }

    // West Direction
    if (position % 8 != 0) {
        for (i = position + 7; i <= MAX_LENGTH; i += 7) {

            if (document.getElementsByTagName("em")[i].className.indexOf("fa") == -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
            } else if (document.getElementsByTagName("em")[i].className.indexOf(chessColor) != -1) {
                document.getElementsByTagName("button")[i].style.backgroundColor = "red";
                break;
            } else {
                break;
            }
            if (i % 8 == 0) {
                break;
            }
        }
    }
}

function showKnightMoves(elemClass) {
    position = parseInt(elemClass.substr(-2, 2).trim());
    pos = position;
    chessColor = "black";
    MAX_LENGTH = 64;
    MIN_LENGTH = 0;
    if (elemClass.indexOf("black") != -1) {
        chessColor = "white";
    }

    if ((position % 8 > 1) && position > 10) {
        if (document.getElementsByTagName("em")[position - 10].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position - 10].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position - 10].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position - 10].style.backgroundColor = "red";
        }
    }

    if ((position % 8 != 0) && position > 17) {
        if (document.getElementsByTagName("em")[position - 17].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position - 17].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position - 17].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position - 17].style.backgroundColor = "red";
        }
    }

    if ((position % 8 > 1) && position < 58) {
        if (document.getElementsByTagName("em")[position + 6].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position + 6].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position + 6].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position + 6].style.backgroundColor = "red";
        }
    }

    if ((position % 8 != 0) && position < 49) {
        if (document.getElementsByTagName("em")[position + 15].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position + 15].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position + 15].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position + 15].style.backgroundColor = "red";
        }
    }

    if ((position % 8 < 6) && position < 54) {
        if (document.getElementsByTagName("em")[position + 10].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position + 10].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position + 10].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position + 10].style.backgroundColor = "red";
        }
    }

    if ((position % 8 != 7) && position < 47) {
        if (document.getElementsByTagName("em")[position + 17].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position + 17].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position + 17].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position + 17].style.backgroundColor = "red";
        }
    }

    if ((position % 8 < 6) && position > 6) {
        if (document.getElementsByTagName("em")[position - 6].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position - 6].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position - 6].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position - 6].style.backgroundColor = "red";
        }
    }

    if ((position % 8 != 7) && position > 15) {
        if (document.getElementsByTagName("em")[position - 15].className.indexOf("fa") == -1) {
            document.getElementsByTagName("button")[position - 15].style.backgroundColor = "red";
        } else if (document.getElementsByTagName("em")[position - 15].className.indexOf(chessColor) != -1) {
            document.getElementsByTagName("button")[position - 15].style.backgroundColor = "red";
        }
    }

}

function movePiece(e) {
    console.log(e.target);
    elemClass = localStorage.getItem("lastPiece");
    position = parseInt(elemClass.substr(-2, 2).trim());
    document.getElementsByTagName("em")[position].setAttribute("class", "");
    newPosition = parseInt(e.target.className.substr(-2, 2).trim());
    newElemClass = elemClass;
    if (elemClass.indexOf("start") != -1) {
        newElemClass = elemClass.replace("start", "");
    }
    if (elemClass.indexOf("black") != -1) {
        document.getElementsByTagName("em")[newPosition].setAttribute("class", newElemClass + " " + (newPosition));
    } else {
        document.getElementsByTagName("em")[newPosition].setAttribute("class", newElemClass + " " + (newPosition));

    }
    resetColors();
}

function showKingMoves(elemClass) {
    showPawnMoves(elemClass);
    position = parseInt(elemClass.substr(-2, 2).trim());

    if (elemClass.indexOf("black") != -1) {
        if (position + 9 < 64) {
            if (document.getElementsByTagName("em")[position + 7].className.indexOf("black") == -1 && position % 8 != 0) {
                document.getElementsByTagName("button")[position + 7].style.backgroundColor = "red";

            }


            if ((document.getElementsByTagName("em")[position + 9].className.indexOf("black") == -1) && (position + 9) % 8 != 0) {
                document.getElementsByTagName("button")[position + 9].style.backgroundColor = "red";

            }

            if (!(document.getElementsByTagName("em")[position + 8].className.indexOf("black") != -1)) {
                document.getElementsByTagName("button")[position + 8].style.backgroundColor = "red";
            }
        }
        if (position - 9 > 0) {
            if ((document.getElementsByTagName("em")[position - 7].className.indexOf("black") == -1) && (position - 7) % 8 != 0) {
                document.getElementsByTagName("button")[position - 7].style.backgroundColor = "red";
            }
            if ((document.getElementsByTagName("em")[position - 8].className.indexOf("black") == -1) && (position - 8) > 0) {
                document.getElementsByTagName("button")[position - 8].style.backgroundColor = "red";
            }
            if ((document.getElementsByTagName("em")[position - 9].className.indexOf("black") == -1) && (position) % 8 != 0) {
                document.getElementsByTagName("button")[position - 9].style.backgroundColor = "red";
            }
        }
        if(position + 1 < 64) {
            if ((document.getElementsByTagName("em")[position + 1].className.indexOf("black") == -1) && (position + 1) % 8 != 0) {
            document.getElementsByTagName("button")[position + 1].style.backgroundColor = "red";
        }
        }
        if(position - 1 > 0) {
             if ((document.getElementsByTagName("em")[position - 1].className.indexOf("black") == -1) && (position) % 8 != 0) {
            document.getElementsByTagName("button")[position - 1].style.backgroundColor = "red";
        }
        }
       

    }

    if (elemClass.indexOf("white") != -1) {
        if (position - 9 > 0) {
            console.log('hey');
            if (document.getElementsByTagName("em")[position - 7].className.indexOf("white") == -1 && (position - 7) % 8 != 0) {
                document.getElementsByTagName("button")[position - 7].style.backgroundColor = "red";

            }
            if (document.getElementsByTagName("em")[position - 9].className.indexOf("white") == -1 && position % 8 != 0) {
                document.getElementsByTagName("button")[position - 9].style.backgroundColor = "red";

            }
            if (!(document.getElementsByTagName("em")[position - 8].className.indexOf("white") != -1)) {
                document.getElementsByTagName("button")[position - 8].style.backgroundColor = "red";
            }
        }
        if(position + 1 < 64) {
            if ((document.getElementsByTagName("em")[position + 1].className.indexOf("white") == -1) && (position + 1) % 8 != 0) {
            document.getElementsByTagName("button")[position + 1].style.backgroundColor = "red";
        }
        }
        if(position - 1 > 0) {
             if ((document.getElementsByTagName("em")[position - 1].className.indexOf("white") == -1) && (position) % 8 != 0) {
            document.getElementsByTagName("button")[position - 1].style.backgroundColor = "red";
        }
        }
        if (position + 9 < 64) {
            if (document.getElementsByTagName("em")[position + 7].className.indexOf("white") == -1 && position % 8 != 0) {
                document.getElementsByTagName("button")[position + 7].style.backgroundColor = "red";

            }


            if ((document.getElementsByTagName("em")[position + 9].className.indexOf("white") == -1) && (position + 9) % 8 != 0) {
                document.getElementsByTagName("button")[position + 9].style.backgroundColor = "red";

            }

            if (!(document.getElementsByTagName("em")[position + 8].className.indexOf("white") != -1)) {
                document.getElementsByTagName("button")[position + 8].style.backgroundColor = "red";
            }
        }
    }


}
