(function() {
    var interval = null;
    try {
        var remEl = document.querySelector('[data-remaining-value]');
        var remProcentEl = document.querySelector('[data-procent-remaining-value]');
        var procentSoldEl = document.querySelector('[data-procent-sold]');
        var procentRemEl = document.querySelector('[data-procent-remaining]');


        function updateRemaining(collected) {
            var procentSold = Math.round((9000 + collected) / 15000 * 100);
            var procentRemaining = 100 - procentSold;

            if (typeof remEl !== 'undefined' && remEl !== null) {
                remEl.innerHTML = 6000 - collected;
            }
            if (typeof remProcentEl !== 'undefined' && remProcentEl !== null) {
                remProcentEl.innerHTML = procentRemaining + '%';
            }

            procentSoldEl.style.width = procentSold + '%';
            procentRemEl.style.width = procentRemaining + '%';
            document.querySelector('[data-process]').style.display = '';
        }

        var abi = [{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"_country","type":"uint8"}],"name":"allow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensaleWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allowedCountries","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"onTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_maxCap","type":"uint256"}],"name":"setMaxCap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalizeTokenSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"tokensSold","type":"uint256"}],"name":"allocateTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_active","type":"bool"}],"name":"setPersonalCapActive","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"personalCapActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"founderWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_country","type":"uint8"},{"name":"_allowed","type":"bool"}],"name":"allowCountry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokensaleWallet","type":"address"}],"name":"setTokensaleWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"personalCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_founderWallet","type":"address"}],"name":"setFounderWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiaries","type":"address[]"},{"name":"_country","type":"uint8"}],"name":"allowMultiple","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"onApprove","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalCollected","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"proxyPayment","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_capInWei","type":"uint256"}],"name":"setPersonalCap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenAddress","type":"address"},{"name":"_founderWallet","type":"address"},{"name":"_tokensaleWallet","type":"address"},{"name":"_rate","type":"uint256"},{"name":"_maxCap","type":"uint256"},{"name":"_personalCap","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_beneficiary","type":"address"},{"indexed":false,"name":"_weiAmount","type":"uint256"},{"indexed":false,"name":"_tokenAmount","type":"uint256"},{"indexed":false,"name":"_personalCapActive","type":"bool"}],"name":"Paid","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
        var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.fundrequest.io/"));

        var contract = web3.eth.contract(abi);
        var contractInstance = contract.at("0xbcc546eb5a290977180f85cafaa712019893729c");

        function getRemaining() {
            contractInstance.totalCollected.call(function(err, result) {
                try {
                    var amountInWei = new BigNumber(result);
                    var number = amountInWei.dividedBy(1000000000000000000);
                    var collected = Math.round(number * 100) / 100;
                    updateRemaining(collected);
                } catch(e) {
                    console.error(e);
                    clearInterval(interval);
                    document.querySelector('[data-process]').style.display = 'none';
                }
            });
        }

        getRemaining();
        interval = setInterval(getRemaining, 15000);
    } catch(e) {
        console.error(e);
        clearInterval(interval);
        document.querySelector('[data-process]').style.display = 'none';
    }
})();

