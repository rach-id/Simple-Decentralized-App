App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      //App.web3Provider = web3.currentProvider;
      //web3 = new Web3(web3.currentProvider);
      App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    } else {
      // Specify default instance if no web3 instance provided
      // App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
      // web3 = new Web3(App.web3Provider);
      
    }
    return App.initContract(); // Goto initContract function
  },

  initContract: function() {
    $.getJSON("Exchange.json", function(exchange) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Exchange = TruffleContract(exchange);
      // Connect provider to interact with contract
      App.contracts.Exchange.setProvider(App.web3Provider);

      return App.render();
    });
  },

render: function() {
  var exchangeInstance;
  var loader = $("#loader");
  var content = $("#content");

  loader.show();
  content.hide();

  // Load account data
  web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
      App.account = account;
      $("#accountAddress").html("Your Account: " + account);
    }
  });

  // Load contract data
  App.contracts.Exchange.deployed().then(function(instance) {
    exchangeInstance = instance;
    return exchangeInstance.itemsCount();
  }).then(function(itemsCount) {
    var itemsResults = $("#itemsResults");
    itemsResults.empty();

    var candidatesSelect = $('#itemsSelect');
    candidatesSelect.empty();

    for (var i = 0; i < itemsCount; i++) {
      exchangeInstance.items(i).then(function(item) {
        var id = item[0];
        var name = item[1];
        var desc = item[2];
        var price = item[3];
        var owner = item[4];
        var available = item[5];

		console.log(available);
		
		if (available == true) available = "No";
		else if (available == false) available = "Yes";
		
        // Render items Result
        var itemTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + desc + "</th><td>" + price + "</th><td>" + owner + "</th><td>" + available + "</td></tr>"
        itemsResults.append(itemTemplate);

        // Render candidate ballot option
        var itemOption = "<option value='" + id + "' >" + name + "</ option>"
        candidatesSelect.append(itemOption);
      });
      var pri ='ss'
      exchangeInstance.items(i).then(function(item) {pri =item[3];});
      console.log(pri);
    }
    loader.hide();
    content.show();
  }).catch(function(error) {
    //console.warn(error);
  });


}, 
buyItem: function() {
    var itemID = $('#itemsSelect').val();
    App.contracts.Exchange.deployed().then(function(instance) {
    
      return instance.buy_Item(itemID, { from: App.account, gas:800000, value: 2 });
    }).then(function(result) {
      // Wait for items to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }, 
addItem: function() {
	
	var name = $('#name').val()
	var desc = $('#desc').val()
	var price = $('#price').val()
	var addr = $('#owner').val()

	App.contracts.Exchange.deployed().then(function(instance) {
      return instance.add_Item(name, desc, addr, price, { from: App.account, gas:800000 });
    }).then(function(result) {
		$('#success').show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};




$(function() {
  $(window).load(function() {
    App.init();
  });
});
