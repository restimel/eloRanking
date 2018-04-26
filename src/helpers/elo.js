const config = {
    eloMargin: 400,
    eloRatio: 50,
    defaultElo: 1000,
};

function computeElo(player1, player2, result) {
    const p = (D) => 1 / (1 + 10 ** (-D / config.eloMargin));
    const gain = (score, D) => Math.round(config.eloRatio * (score - p(D)));

    const diff = player1.rank - player2.rank;
    const result1 = +result.result1;
    const result2 = +result.result2;
    const scr = (result1 + result2) === 0 ? 0.5 : result1 / (result1 + result2);
    let error = null;

    const gain1 = gain(scr, diff);
    const gain2 = gain(1 - scr, -diff);

    if (isNaN(gain1) || isNaN(gain2)) {
        error = 'An error appears ';
        console.log(error);
    }
    player1.rank = +player1.rank + gain1;
    player2.rank = +player2.rank + gain2;

    return {
        gain1, gain2,
        error,
    }
}

export default {
    config,
    computeElo,
};