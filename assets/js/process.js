(function() {
    var interval = null;
    var intervalLocal = null;

    var totalSold = null;
    var ethLeft = null;

    try {
        /*
        var remEl = document.querySelector('[data-remaining-value]');
        var remProcentEl = document.querySelector('[data-procent-remaining-value]');
        var procentSoldEl = document.querySelector('[data-procent-sold]');
        var procentRemEl = document.querySelector('[data-procent-remaining]');

        function updateRemainingInEth() {
            var procentSold = Math.round((9000 + collected) / 15000 * 100);
            var procentRemaining = 100 - procentSold;

            if (typeof remEl !== 'undefined' && remEl !== null) {
                remEl.innerHTML = (6000 - collected) + ' ETH';
            }
            if (typeof remProcentEl !== 'undefined' && remProcentEl !== null) {
                remProcentEl.innerHTML = procentRemaining + '%';
            }

            procentSoldEl.style.width = procentSold + '%';
            procentRemEl.style.width = procentRemaining + '%';
            document.querySelector('[data-process]').style.display = '';
        }*/

        var tokensSoldPercentageEl = document.querySelector('[data-tokens-sold-percentage]');
        var tokensSoldEl = document.querySelector('[data-tokens-sold]');
        var tokensAvailablePercentageEl = document.querySelector('[data-tokens-available-percentage]');
        var tokensAvailablePercentageValueEl = document.querySelector('[data-tokens-available-percentage-value]');
        var tokensAvailableEl = document.querySelector('[data-tokens-available]');

        function updateRemaining() {
            if(totalSold !== null && ethLeft !== null) {
                var tokensLeft = Math.round(ethLeft * 1800);
                var totalSupply = totalSold + tokensLeft;
                var pctLeft = Math.round((tokensLeft / totalSupply) * 100);
                var pctSold = 100 - pctLeft;

                if (typeof tokensSoldEl !== 'undefined' && tokensSoldEl !== null) {
                    tokensSoldEl.innerHTML = totalSold;
                }
                if (typeof tokensAvailableEl !== 'undefined' && tokensAvailableEl !== null) {
                    tokensAvailableEl.innerHTML = tokensLeft;
                }
                if (typeof tokensAvailablePercentageValueEl !== 'undefined' && tokensAvailablePercentageValueEl !== null) {
                    tokensAvailablePercentageValueEl.innerHTML = pctLeft + '%';
                }
                tokensSoldPercentageEl.style.width = pctSold + '%';
                tokensAvailablePercentageEl.style.width = pctLeft + '%';
                document.querySelector('[data-process]').style.display = '';
            }
        }

        function getRemaining() {
            fnd.contractTokenInstance.totalSupply.call(function(err, result) {
                try {
                    var amountInWei = new BigNumber(result);
                    var number = amountInWei.dividedBy(1000000000000000000);
                    totalSold = parseInt(number.toString());
                } catch(e) {
                    console.error(e);
                    clearInterval(interval);
                    clearInterval(intervalLocal);
                    document.querySelector('[data-process]').style.display = 'none';
                }
            });
            fnd.contractInstance.totalCollected.call(function(err, result) {
                try {
                    var amountInWei = new BigNumber(result);
                    var number = amountInWei.dividedBy(1000000000000000000);
                    ethLeft = 6000 - (Math.round(number * 100) / 100);
                } catch(e) {
                    console.error(e);
                    clearInterval(interval);
                    clearInterval(intervalLocal);
                    document.querySelector('[data-process]').style.display = 'none';
                }
            });
        }

        getRemaining();
        intervalLocal = setInterval(updateRemaining, 1000);
        interval = setInterval(getRemaining, 15000);
    } catch(e) {
        console.error(e);
        clearInterval(interval);
        clearInterval(intervalLocal);
        document.querySelector('[data-process]').style.display = 'none';
    }
})();

