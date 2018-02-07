/*
 * Timers
 * */
(function() {
    function addClass(className) {
        document.body.classList.remove('sale-round1');
        document.body.classList.remove('sale-round2');
        document.body.classList.remove('sale-not-started');
        document.body.classList.remove('sale-closed');
        document.body.classList.add(className);
    }

    var countdownTimer = null;
    var countdownReInit = null;
    var clocks = document.querySelectorAll('.clock');
    var timerSeconds = 0;

    function timer() {
        var days = Math.floor(timerSeconds / 24 / 60 / 60);
        var hoursLeft = Math.floor((timerSeconds) - (days * 86400));
        var hours = Math.floor(hoursLeft / 3600);
        var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
        var minutes = Math.floor(minutesLeft / 60);
        var remainingSeconds = Math.floor(timerSeconds % 60);

        var daysString = days > 9 ? days : '0' + days;
        var hoursString = hours > 9 ? hours : '0' + hours;
        var minutesString = minutes > 9 ? minutes : '0' + minutes;
        var remainingSecondsString = remainingSeconds > 9 ? remainingSeconds : '0' + remainingSeconds;

        clocks.forEach(function(clock) {
            clock.querySelector('.seconds').innerHTML = remainingSecondsString;
            clock.querySelector('.minutes').innerHTML = minutesString;
            clock.querySelector('.hours').innerHTML = hoursString;
            clock.querySelector('.days').innerHTML = daysString;
        });

        if (timerSeconds === 0) {
            clearInterval(countdownTimer);
            initCountDown();
        } else {
            timerSeconds--;
        }
    }

    function startCountDown(seconds) {
        if (countdownTimer !== null) {
            clearInterval(countdownTimer);
        }
        if (countdownReInit !== null) {
            clearInterval(countdownReInit);
        }
        timerSeconds = seconds;
        timer();
        countdownTimer = setInterval(timer, 1000);
        countdownReInit = setInterval(initCountDown, 60000); //Recalibrate after 1 min
    }

    function initCountDown() {
        var dateStartRound1 = new Date(Date.UTC(2018, 1, 12, 9, 0, 0));
        var dateStartRound2 = new Date(Date.UTC(2018, 1, 13, 9, 0, 0));
        var dateStartClosed = new Date(Date.UTC(2018, 1, 14, 9, 0, 0));
        var now = new Date(Date.now());

        var isClosed = false;

        var dateTimer = null;

        if (now < dateStartRound1) {
            dateTimer = dateStartRound1;
        } else if (now < dateStartRound2) {
            addClass('sale-round1');
            dateTimer = dateStartRound2;
        } else if (now < dateStartClosed) {
            addClass('sale-round2');
            dateTimer = dateStartClosed;
        } else {
            addClass('sale-closed');
            isClosed = true;
        }

        if (!isClosed) {
            var diff = now.getTime() - dateTimer.getTime();
            var sec = diff / 1000;
            var seconds = Math.round(Math.abs(sec));
            startCountDown(seconds);
        } else {
            clearInterval(countdownTimer);
            clearInterval(countdownReInit);
        }
    }

    addClass('sale-not-started');
    initCountDown();
})();

/*
 * status, modal
 * */
$(function() {
    function updateStatus(status, ethAddress) {
        var statusEl = document.querySelector('[data-kyc-status]');

        statusEl.classList.remove('alert-warning');
        statusEl.classList.remove('alert-info');
        statusEl.classList.remove('alert-success');
        if (!statusEl.classList.contains('alert')) {
            statusEl.classList.add('alert');
        }

        if (ethAddress !== null && ethAddress.length >= 0) {
            if (status === 'approve') {
                statusEl.innerHTML = 'Your address is whitelisted and KYC approved!';
                statusEl.classList.add('alert-success');
                document.body.classList.add('sale-kyc-verified');
            } else {
                statusEl.innerHTML = '<strong>Oh snap!</strong> Address <samp class="eth-address">' + ethAddress + '</samp> has not passed KYC.';
                statusEl.classList.add('alert-warning');
                document.body.classList.remove('sale-kyc-verified');
            }
        } else {
            statusEl.innerHTML = status;
            statusEl.classList.add('alert-info');
        }
    }

    $('[data-eth-address-check]').on('click', function() {
        var id = this.dataset.ethAddressCheck;
        var ethAddress = document.getElementById(id).value;

        if (ethAddress.length <= 0) {
            updateStatus('Please enter your ETH wallet address.', null);
        } else {
            $.ajax({
                type: 'GET',
                url: 'https://kyc.fundrequest.io/kyc/status/' + ethAddress,
                beforeSend: function() {
                    updateStatus('Checking <samp class="eth-address">' + ethAddress + '</samp> ...', null);
                },
                success: function(response) {
                    var status = null;

                    if (response && response.status) {
                        status = response.status.status;
                    }

                    updateStatus(status, ethAddress);
                }
            });
        }
    });

  $('#agreed-to-terms').on('click', function(e) {
      document.body.classList.remove('sale-terms-agreed');
      document.body.classList.add('sale-terms-agreed');
  });

    $('[data-checkbox-toggle-class]').on('change', function() {
        var className = this.dataset.checkboxToggleClass;
        if (className) {
            document.body.classList.remove(className);
            if (this.checked) {
                document.body.classList.add(className);
            }
        }
    });
    $('#btnCopyTokenSaleAddress').on('click', function() {
      var $btnTokenSale = $('#token-sale-address');
      $btnTokenSale.removeAttr("disabled");
      var copyText = document.getElementById("token-sale-address");
      copyText.select();
      document.execCommand("Copy");
      $btnTokenSale.attr("disabled", "disabled")


    });

});