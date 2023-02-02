
let div = document.getElementById("divSadrzaj");
let prisustvo = TabelaPrisustvo(div, {
    studenti: [
        {
            ime:"Neko",
            index:12345
        },
        {
            ime:"Velid Imširović",
            index:18913
        }
    ],
    prisustva: [
        {
            sedmica:2,
            predavanja:1,
            vjezbe:1,
            index:12345
        },
        {
            sedmica:1,
            predavanja:1,
            vjezbe:1,
            index:12345
        },
        {
            sedmica:1,
            predavanja:3,
            vjezbe:2,
            index:18913
        },
        {
            sedmica:2,
            predavanja:2,
            vjezbe:2,
            index:18913
        },

        {
            sedmica:3,
            predavanja:3,
            vjezbe:2,
            index:12345
        },
        {
            sedmica:4,
            predavanja:2,
            vjezbe:2,
            index:18913
        }
    ],
    predmet:"WT",
    brojPredavanjaSedmicno:3,
    brojVjezbiSedmicno:2
});

//pozivanje metoda
prisustvo.prethodnaSedmica();
prisustvo.sljedecaSedmica();
