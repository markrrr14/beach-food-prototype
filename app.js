
  var TABLE = 'Table 12 - Cottage';

  var stalls = [
    {
      id: 'aling-rosa', name: "Aling Rosa's Barbecue", sells: 'barbecue, inasal, rice meals', free: 4,
      emoji: '\ud83d\udd25', photoClass: 'photo-1', photoLabel: 'Photo: Aling Rosa\u2019s grill',
      menu: [
        { id: 'pork-bbq', name: 'Pork barbecue (2 sticks)', price: 60, emoji: '\ud83c\udf56', photoClass: 'photo-1' },
        { id: 'chicken-inasal', name: 'Chicken inasal', price: 130, emoji: '\ud83c\udf57', photoClass: 'photo-1' },
        { id: 'grilled-liempo', name: 'Grilled liempo', price: 160, emoji: '\ud83e\udd69', photoClass: 'photo-1' },
        { id: 'garlic-rice', name: 'Garlic rice', price: 35, emoji: '\ud83c\udf5a', photoClass: 'photo-1' }
      ]
    },
    {
      id: 'kuya-jun', name: "Kuya Jun's Seafood Grill", sells: 'grilled fish, squid, kinilaw', free: 1,
      emoji: '\ud83d\udc1f', photoClass: 'photo-2', photoLabel: 'Photo: Kuya Jun\u2019s seafood',
      menu: [
        { id: 'grilled-fish', name: 'Grilled fish', price: 120, emoji: '\ud83d\udc1f', photoClass: 'photo-2' },
        { id: 'grilled-squid', name: 'Grilled squid', price: 150, emoji: '\ud83e\udd91', photoClass: 'photo-2' },
        { id: 'kinilaw', name: 'Kinilaw', price: 100, emoji: '\ud83e\udd57', photoClass: 'photo-2' }
      ]
    },
    {
      id: 'nena', name: "Nena's Halo-halo and Drinks", sells: 'halo-halo, buko juice, soft drinks', free: 0,
      emoji: '\ud83c\udf67', photoClass: 'photo-3', photoLabel: 'Photo: Nena\u2019s halo-halo',
      menu: [
        { id: 'halo-halo', name: 'Halo-halo', price: 75, emoji: '\ud83c\udf67', photoClass: 'photo-3' },
        { id: 'buko-juice', name: 'Buko juice', price: 40, emoji: '\ud83e\udd64', photoClass: 'photo-3' },
        { id: 'softdrinks', name: 'Soft drinks', price: 25, emoji: '\ud83e\udd64', photoClass: 'photo-3' }
      ]
    }
  ];

  function initialState() {
    return {
      screen: 'scan',
      role: 'customer',
      lang: 'en',
      payment: 'cash',
      readyAlert: 'none',
      vendorAlertDismissed: false,
      menuStall: 'aling-rosa',
      cartStall: 'aling-rosa',
      carts: { 'aling-rosa': { 'pork-bbq': 2, 'chicken-inasal': 1, 'garlic-rice': 2 } },
      soldOut: {},
      myOrderId: 'A-27',
      serverCalled: false,
      orderSeq: 30,
      orders: [
        { id: 'A-28', table: 'Table 5 - Cottage 1', items: '3 \u00d7 Pork barbecue (2 sticks), 1 \u00d7 Garlic rice', status: 'received', stallId: 'aling-rosa', stallName: "Aling Rosa's Barbecue", receivedAt: '1:38 PM', payment: 'cash' },
        { id: 'A-29', table: 'Table 8 - Cottage', items: '1 \u00d7 Grilled liempo, 1 \u00d7 Chicken inasal', status: 'received', stallId: 'aling-rosa', stallName: "Aling Rosa's Barbecue", receivedAt: '1:40 PM', payment: 'gcash' },
        { id: 'A-27', table: 'Table 12 - Cottage', items: '2 \u00d7 Pork barbecue (2 sticks), 1 \u00d7 Chicken inasal, 2 \u00d7 Garlic rice', status: 'preparing', stallId: 'aling-rosa', stallName: "Aling Rosa's Barbecue", receivedAt: '1:42 PM', payment: 'cash' },
        { id: 'A-26', table: 'Table 3 - Cottage 2', items: '1 \u00d7 Grilled liempo, 1 \u00d7 Garlic rice', status: 'ready', stallId: 'aling-rosa', stallName: "Aling Rosa's Barbecue", receivedAt: '1:35 PM', payment: 'maya' }
      ]
    };
  }

  var state = initialState();

  var PAYMENTS = [
    { id: 'cash', name: 'Cash', emoji: '\ud83d\udcb0' },
    { id: 'gcash', name: 'GCash', emoji: '\ud83d\udcf1' },
    { id: 'maya', name: 'Maya', emoji: '\ud83e\udde1' }
  ];

  function payName(id) {
    for (var i = 0; i < PAYMENTS.length; i++) if (PAYMENTS[i].id === id) return PAYMENTS[i].name;
    return 'Cash';
  }

  var I18N = {
    en: {
      scanTitle: "Scan your table's QR code",
      scanNote: 'Point your camera at the QR code on your table. It tells us where to bring your food.',
      scanBtn: 'Scan table QR',
      scanDemo: "Demo: I'm at Table 12",
      ltTitle: 'Language and table',
      ltLangTitle: 'Choose your language',
      ltTableNote: 'Filled in from the QR code you just scanned.',
      ltCheckTitle: 'Is this your table?',
      ltCheckSub: 'Your order will be brought here. If it is wrong, scan the QR code on your own table instead.',
      ltConfirm: 'Confirm table and start ordering',
      stallsQ: 'What would you like to eat?',
      tableNote: 'Filled in from your QR code',
      payTitle: 'Payment method',
      payCash: 'Cash is paid at the stall or when the food reaches your table.',
      payGcash: 'You will pay with GCash when the food is delivered to your table.',
      payMaya: 'You will pay with Maya when the food is delivered to your table.',
      orderSent: function (id) { return 'Order ' + id + ' sent! The stall has received it.'; },
      readyTitle: 'Your order is ready!',
      readyBanner: 'On its way to your table',
      toastPay: function (n) { return 'Paying with ' + n + '.'; }
    },
    ceb: {
      scanTitle: 'I-scan ang QR code sa imong lamesa',
      scanNote: 'Itutok ang imong camera sa QR code sa imong lamesa. Niya mag-taga namo og lugar asa dad-on ang imong pagkaon.',
      scanBtn: 'I-scan ang QR sa lamesa',
      scanDemo: 'Demo: Naa ko sa Table 12',
      ltTitle: 'Wika ug lamesa',
      ltLangTitle: 'Pili ang imong wika',
      ltTableNote: 'Gikan sa QR code nga imong gi-scan.',
      ltCheckTitle: 'Kini ba ang imong lamesa?',
      ltCheckSub: 'Diri dad-on ang imong order. Kung sayop, i-scan ang QR code sa imong kaugalingong lamesa.',
      ltConfirm: 'Kumpirmahi ang lamesa ug sugdi ang pag-order',
      stallsQ: 'Unsa ang gusto nimo kaonon?',
      tableNote: 'Gikan sa imong QR code',
      payTitle: 'Paagi sa pagbayad',
      payCash: 'Cash ang bayran sa stall o kon madat-an na ang pagkaon sa imong lamesa.',
      payGcash: 'Gamiton nimo ang GCash sa pagbayad sa pagkaon madat-an na sa imong lamesa.',
      payMaya: 'Gamiton nimo ang Maya sa pagbayad sa pagkaon madat-an na sa imong lamesa.',
      orderSent: function (id) { return 'Napuslan ang order ' + id + '! Dawat na sa stall.'; },
      readyTitle: 'Andam na ang imong order!',
      readyBanner: 'Padulong na sa imong lamesa',
      toastPay: function (n) { return 'Paga-bayaran gamit ang ' + n + '.'; }
    }
  };

  function t(k) {
    var dict = I18N[state.lang] || I18N.en;
    return dict[k] !== undefined ? dict[k] : I18N.en[k];
  }

  var CUSTOMER_NAV = [
    { id: 'stalls', label: 'Stalls', icon: '<path d="M6 4h12l1 5H5l1-5zm1 7h10l-1.2 7H8.2L7 11zm1.8 2-.4 3h6.4l-.4-3h-5.6z"/>' },
    { id: 'cart', label: 'Cart', icon: '<path d="M7 8V6a5 5 0 0 1 10 0v2h3l-1 12H5L4 8h3zm2 0h6V6a3 3 0 0 0-6 0v2z"/>' },
    { id: 'tracking', label: 'Orders', icon: '<path d="M12 2a6 6 0 0 0-6 6v3l-2 4h16l-2-4V8a6 6 0 0 0-6-6zm-2 16h4a2 2 0 0 1-4 0z"/>' },
    { id: 'help', label: 'Help', icon: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm1.07-7.75-.9.92C12.45 10.9 12 11.5 12 13h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 1 0-4 0H8a4 4 0 1 1 8 0c0 .88-.36 1.68-.93 2.25z"/>' }
  ];

  var VENDOR_NAV = [
    { id: 'vendor', label: 'Orders', icon: '<path d="M12 2a6 6 0 0 0-6 6v3l-2 4h16l-2-4V8a6 6 0 0 0-6-6zm-2 16h4a2 2 0 0 1-4 0z"/>' },
    { id: 'vendormenu', label: 'Menu', icon: '<path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h10v2H4v-2z"/>' },
    { id: 'vendorseats', label: 'Seats', icon: '<path d="M3 10h18v2H3v-2zm2-6h2v4H5V4zm12 0h2v4h-2V4zM7 12l-2 8h2l1-4h8l1 4h2l-2-8H7z"/>' },
    { id: 'help', label: 'Help', icon: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm1.07-7.75-.9.92C12.45 10.9 12 11.5 12 13h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 1 0-4 0H8a4 4 0 1 1 8 0c0 .88-.36 1.68-.93 2.25z"/>' }
  ];

  function peso(n) { return '\u20b1' + n; }
  function stallById(id) { for (var i = 0; i < stalls.length; i++) if (stalls[i].id === id) return stalls[i]; return stalls[0]; }
  function findItem(itemId) {
    for (var i = 0; i < stalls.length; i++)
      for (var j = 0; j < stalls[i].menu.length; j++)
        if (stalls[i].menu[j].id === itemId) return stalls[i].menu[j];
    return null;
  }
  function cartFor(stallId) { return state.carts[stallId] || {}; }
  function cartEntries(stallId) {
    var c = cartFor(stallId);
    return stallById(stallId).menu.filter(function (m) { return c[m.id] > 0; })
      .map(function (m) { return { id: m.id, name: m.name, price: m.price, qty: c[m.id] }; });
  }
  function cartCount(stallId) { return cartEntries(stallId).reduce(function (s, i) { return s + i.qty; }, 0); }
  function cartTotal(stallId) { return cartEntries(stallId).reduce(function (s, i) { return s + i.price * i.qty; }, 0); }
  function seatInfo(free) {
    if (free <= 0) return { cls: 'full', text: 'Full (0 free)', word: 'Full' };
    if (free <= 2) return { cls: 'few', text: 'Few left (' + free + ' free)', word: 'Few left' };
    return { cls: 'available', text: 'Available (' + free + ' free)', word: 'Available' };
  }
  function nowTime() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12; if (h === 0) h = 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
  }

  var pendingAdd = null;

  function go(screen) {
    state.screen = screen;
    if (screen === 'vendor' || screen === 'vendormenu' || screen === 'vendorseats') state.role = 'vendor';
    else if (screen !== 'help') state.role = 'customer';
    document.querySelectorAll('.screen-view').forEach(function (el) { el.classList.remove('active'); });
    document.getElementById('screen-' + screen).classList.add('active');
    var sc = document.querySelector('#screen-' + screen + ' .screen');
    if (sc) sc.scrollTop = 0;
    if (screen === 'tracking' && state.readyAlert === 'pending') showReadyAlert(state.myOrderId);
    render();
  }

  function backToMenu() { state.menuStall = state.cartStall; go('menu'); }

  var CUSTOMER_FLOW = ['Scan', 'Language', 'Stalls', 'Menu', 'Cart', 'Track', 'Ready'];
  var CUSTOMER_FLOW_SCREENS = {
    scan: 0, langtable: 1, stalls: 2, menu: 3, cart: 4, tracking: 5
  };
  var VENDOR_FLOW = ['Open', 'New order', 'Accept', 'Cook', 'Ready', 'Seats'];

  function flowStepsHtml(steps, activeIdx) {
    return steps.map(function (label, i) {
      var cls = i < activeIdx ? 'done' : (i === activeIdx ? 'active' : '');
      var num = i < activeIdx
        ? '<span class="flow-num">\u2713</span>'
        : '<span class="flow-num">' + (i + 1) + '</span>';
      return '<span class="flow-step ' + cls + '">' + num + label + '</span>';
    }).join('');
  }

  function renderFlow() {
    var cIdx = CUSTOMER_FLOW_SCREENS[state.screen];
    var cHtml = '';
    if (cIdx !== undefined) {
      if (state.screen === 'tracking') {
        var my = null;
        for (var i = 0; i < state.orders.length; i++) if (state.orders[i].id === state.myOrderId) my = state.orders[i];
        if (my && (my.status === 'ready' || my.status === 'served')) cIdx = 6;
      }
      cHtml = flowStepsHtml(CUSTOMER_FLOW, cIdx);
    }
    ['scan', 'langtable', 'stalls', 'menu', 'cart', 'tracking'].forEach(function (id) {
      var el = document.getElementById('flow-' + id);
      if (el) el.innerHTML = cHtml;
    });

    var vEl = document.getElementById('flow-vendor');
    if (vEl) {
      var stage = 1;
      var hasNew = state.orders.some(function (o) { return o.status === 'received' && o.isNew && o.stallId === 'aling-rosa'; });
      var oldest = null;
      state.orders.forEach(function (o) {
        if (o.status === 'served' || o.stallId !== 'aling-rosa') return;
        if (!oldest) oldest = o;
      });
      if (state.screen === 'vendorseats') stage = 5;
      else if (hasNew) stage = 1;
      else if (oldest && oldest.status === 'received') stage = 2;
      else if (oldest && oldest.status === 'accepted') stage = 2;
      else if (oldest && oldest.status === 'preparing') stage = 3;
      else if (oldest && oldest.status === 'ready') stage = 4;
      vEl.innerHTML = flowStepsHtml(VENDOR_FLOW, stage);
    }
  }

  function scanDone() { go('langtable'); }

  function setLang(lang) {
    state.lang = lang;
    render();
    toast(lang === 'ceb' ? 'Wika: Bisaya' : 'Language: English');
  }

  function confirmTable() {
    go('stalls');
    toast(t('ltConfirm') === I18N.en.ltConfirm
      ? 'Table 12 confirmed. Let\u2019s eat!'
      : 'Table 12 gikumpirma. Sige na ta!');
  }

  function setPayment(id) {
    state.payment = id;
    render();
    var name = payName(id);
    toast(typeof t('toastPay') === 'function' ? t('toastPay')(name) : 'Paying with ' + name + '.');
  }

  function dismissVendorAlert() {
    state.vendorAlertDismissed = true;
    render();
  }

  function showReadyAlert(id) {
    var order = null;
    for (var i = 0; i < state.orders.length; i++) if (state.orders[i].id === id) order = state.orders[i];
    if (!order) return;
    document.getElementById('ready-sheet-title').textContent = t('readyTitle');
    document.getElementById('ready-sheet-note').textContent = 'Order #' + order.id + ' is on its way to ' + order.table + ' now.';
    document.getElementById('ready-sheet').classList.add('open');
    state.readyAlert = 'shown';
  }

  function closeReadySheet() {
    document.getElementById('ready-sheet').classList.remove('open');
    state.readyAlert = 'dismissed';
    render();
  }

  function dismissReadySheet() {
    document.getElementById('ready-sheet').classList.remove('open');
    state.readyAlert = 'dismissed';
    go('tracking');
  }

  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  function openStall(id) { state.menuStall = id; go('menu'); }

  function addToCart(itemId, d) {
    var stallId = state.menuStall;
    var otherStalls = stalls.filter(function (s) { return s.id !== stallId && cartCount(s.id) > 0; });
    if (d > 0 && otherStalls.length > 0 && cartCount(stallId) === 0) {
      pendingAdd = { stallId: stallId, itemId: itemId, d: d };
      document.getElementById('newcart-note').textContent =
        'Your cart has ' + cartCount(otherStalls[0].id) + ' item(s) from ' + otherStalls[0].name +
        '. One order can only go to one stall.';
      document.getElementById('newcart-sheet').classList.add('open');
      return;
    }
    var cart = state.carts[stallId] || (state.carts[stallId] = {});
    var next = (cart[itemId] || 0) + d;
    if (next <= 0) delete cart[itemId];
    else cart[itemId] = next;
    state.cartStall = stallId;
    render();
  }

  function setQty(itemId, d) { addToCart(itemId, d); }

  function removeItem(itemId) {
    var cart = cartFor(state.cartStall);
    delete cart[itemId];
    render();
  }

  function confirmNewCart() {
    state.carts = {};
    state.cartStall = pendingAdd.stallId;
    document.getElementById('newcart-sheet').classList.remove('open');
    addToCart(pendingAdd.itemId, pendingAdd.d);
    pendingAdd = null;
    toast('New cart started.');
  }
  function cancelNewCart() {
    document.getElementById('newcart-sheet').classList.remove('open');
    pendingAdd = null;
  }

  function changeSeats(d) {
    var s = stallById('aling-rosa');
    s.free = Math.max(0, Math.min(20, s.free + d));
    render();
  }

  function toggleSoldOut(itemId) {
    if (state.soldOut[itemId]) delete state.soldOut[itemId];
    else state.soldOut[itemId] = true;
    render();
  }

  function openSheet() {
    if (cartCount(state.cartStall) === 0) { toast('Your cart is empty.'); return; }
    document.getElementById('confirm-sheet').classList.add('open');
  }
  function closeSheet() { document.getElementById('confirm-sheet').classList.remove('open'); }

  function sendOrder() {
    closeSheet();
    var stallId = state.cartStall;
    var stall = stallById(stallId);
    var entries = cartEntries(stallId);
    if (entries.length === 0) return;
    var id = 'A-' + state.orderSeq;
    state.orderSeq++;
    state.orders.unshift({
      id: id,
      table: TABLE,
      items: entries.map(function (i) { return i.qty + ' \u00d7 ' + i.name; }).join(', '),
      status: 'received',
      stallId: stallId,
      stallName: stall.name,
      receivedAt: nowTime(),
      payment: state.payment,
      isNew: true
    });
    state.myOrderId = id;
    state.carts[stallId] = {};
    state.serverCalled = false;
    state.readyAlert = 'none';
    state.vendorAlertDismissed = false;
    go('tracking');
    toast(typeof t('orderSent') === 'function' ? t('orderSent')(id) : 'Order ' + id + ' sent!');
  }

  function advanceOrder(id) {
    for (var i = 0; i < state.orders.length; i++) {
      var o = state.orders[i];
      if (o.id !== id) continue;
      if (o.status === 'received') { o.status = 'accepted'; o.isNew = false; toast(o.id + ' accepted \u2014 preparing starts next.'); }
      else if (o.status === 'accepted') { o.status = 'preparing'; toast(o.id + ' is now being prepared.'); }
      else if (o.status === 'preparing') {
        o.status = 'ready';
        if (o.id === state.myOrderId && state.readyAlert === 'none') {
          if (state.role === 'customer') showReadyAlert(o.id);
          else state.readyAlert = 'pending';
        }
        toast(o.id + ' is ready!');
      }
      else if (o.status === 'ready') { o.status = 'served'; o.servedAt = nowTime(); toast(o.id + ' served to the table.'); }
      break;
    }
    render();
  }

  function callServer() {
    if (state.serverCalled) return;
    state.serverCalled = true;
    render();
    toast('A server is on the way to ' + TABLE + '.');
  }

  function resetDemo() {
    var screen = state.screen, role = state.role;
    stalls[0].free = 4;
    state = initialState();
    state.screen = screen;
    state.role = role;
    render();
    toast('Demo reset.');
  }

  function navHtml(items, activeId) {
    return items.map(function (n) {
      var active = n.id === activeId ? ' active' : '';
      return '<button class="nav-item' + active + '" onclick="navClick(\'' + n.id + '\')">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">' + n.icon + '</svg>' +
        '<span>' + n.label + '</span></button>';
    }).join('');
  }

  function navClick(id) {
    if (id === 'help') { go('help'); return; }
    go(id);
  }

  function renderNavs() {
    var customerActive = { stalls: 'stalls', menu: 'stalls', cart: 'cart', tracking: 'tracking' }[state.screen] || '';
    var vendorActive = { vendor: 'vendor', vendormenu: 'vendormenu', vendorseats: 'vendorseats' }[state.screen] || '';
    var html = navHtml(CUSTOMER_NAV, customerActive);
    document.getElementById('nav-stalls').innerHTML = html;
    document.getElementById('nav-menu').innerHTML = html;
    document.getElementById('nav-cart').innerHTML = html;
    document.getElementById('nav-tracking').innerHTML = html;
    var vhtml = navHtml(VENDOR_NAV, vendorActive);
    document.getElementById('nav-vendor').innerHTML = vhtml;
    document.getElementById('nav-vendormenu').innerHTML = vhtml;
    document.getElementById('nav-vendorseats').innerHTML = vhtml;
    document.getElementById('nav-help').innerHTML =
      state.role === 'vendor' ? navHtml(VENDOR_NAV, 'help') : navHtml(CUSTOMER_NAV, 'help');
  }

  function renderStalls() {
    var wrap = document.getElementById('stall-cards');
    wrap.innerHTML = stalls.map(function (s) {
      var info = seatInfo(s.free);
      return '<button class="card clickable" onclick="openStall(\'' + s.id + '\')">' +
        '<div class="card-photo ' + s.photoClass + '">' + s.emoji +
          '<span class="photo-label">' + s.photoLabel + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-title-row"><div class="card-title">' + s.name + '</div></div>' +
          '<div class="card-subtitle">' + s.sells + '</div>' +
          '<div class="seat-line ' + info.cls + '">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 10h18v2H3v-2zm2-6h2v4H5V4zm12 0h2v4h-2V4zM7 12l-2 8h2l1-4h8l1 4h2l-2-8H7z"/></svg>' +
            '<span>' + info.text + '</span>' +
          '</div>' +
        '</div>' +
      '</button>';
    }).join('');
  }

  function renderMenu() {
    var stall = stallById(state.menuStall);
    document.getElementById('menu-stall-name').textContent = stall.name;
    document.getElementById('menu-seats-note').textContent = 'Seats: ' + seatInfo(stall.free).text + ' \u00b7 ' + TABLE;

    var cart = cartFor(stall.id);
    document.getElementById('menu-list').innerHTML = stall.menu.map(function (m) {
      var qty = cart[m.id] || 0;
      var sold = !!state.soldOut[m.id];
      var control;
      if (sold) {
        control = '<span class="sold-label">Sold out</span>';
      } else if (qty === 0) {
        control = '<button class="btn btn-orange btn-sm" onclick="setQty(\'' + m.id + '\',1)">Add</button>';
      } else {
        control = '<div class="qty-control">' +
          '<button class="qty-btn" onclick="setQty(\'' + m.id + '\',-1)" aria-label="Remove one">&minus;</button>' +
          '<span class="qty-value">' + qty + '</span>' +
          '<button class="qty-btn" onclick="setQty(\'' + m.id + '\',1)" aria-label="Add one">+</button>' +
        '</div>';
      }
      return '<div class="menu-item' + (sold ? ' sold' : '') + '">' +
        '<div class="menu-photo ' + m.photoClass + '">' + m.emoji + '</div>' +
        '<div class="menu-info"><div class="menu-name">' + m.name + '</div>' +
        '<div class="menu-price">' + peso(m.price) + '</div></div>' +
        control + '</div>';
    }).join('');

    var count = cartCount(stall.id);
    var bar = document.getElementById('cart-bar');
    if (count === 0) { bar.style.display = 'none'; }
    else {
      bar.style.display = 'flex';
      document.getElementById('cart-bar-title').textContent =
        'Your cart \u00b7 ' + stallById(state.cartStall).name.split(' ')[0] + ' \u00b7 ' + count + (count === 1 ? ' item' : ' items');
      document.getElementById('cart-bar-total').textContent = peso(cartTotal(state.cartStall));
    }
  }

  function renderCart() {
    var stallId = state.cartStall;
    var stall = stallById(stallId);
    document.getElementById('cart-stall-name').textContent = stall.name;

    var entries = cartEntries(stallId);
    var wrap = document.getElementById('cart-lines');
    var totalRow = document.getElementById('cart-total-row');
    var fixed = document.getElementById('cart-fixed');

    if (entries.length === 0) {
      wrap.innerHTML = '<div class="empty-state">' +
        '<svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M7 8V6a5 5 0 0 1 10 0v2h3l-1 12H5L4 8h3zm2 0h6V6a3 3 0 0 0-6 0v2z"/></svg>' +
        '<div class="card-title">Your cart is empty</div>' +
        '<div class="card-subtitle">Pick a stall and add food to get started.</div>' +
        '<button class="btn btn-orange" onclick="go(\'stalls\')">Browse stalls</button>' +
      '</div>';
      totalRow.style.display = 'none';
      fixed.style.display = 'none';
      document.getElementById('pay-card').style.display = 'none';
    } else {
      totalRow.style.display = 'flex';
      fixed.style.display = 'flex';
      document.getElementById('pay-card').style.display = 'flex';
      wrap.innerHTML = entries.map(function (i) {
        return '<div class="cart-line">' +
          '<div class="cart-line-info">' +
            '<div class="cart-line-name">' + i.name + '</div>' +
            '<div class="cart-line-price">' + peso(i.price * i.qty) + (i.qty > 1 ? ' \u00b7 ' + i.qty + ' \u00d7 ' + peso(i.price) : '') + '</div>' +
            '<div class="qty-control" style="margin-top:6px;">' +
              '<button class="qty-btn" onclick="setQty(\'' + i.id + '\',-1)" aria-label="Remove one">&minus;</button>' +
              '<span class="qty-value">' + i.qty + '</span>' +
              '<button class="qty-btn" onclick="setQty(\'' + i.id + '\',1)" aria-label="Add one">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-line-actions"><button class="remove-link" onclick="removeItem(\'' + i.id + '\')">Remove</button></div>' +
        '</div>';
      }).join('');
    }

    var count = cartCount(stallId);
    document.getElementById('cart-total-label').textContent = 'Total \u00b7 ' + count + (count === 1 ? ' item' : ' items');
    document.getElementById('cart-total-amount').textContent = peso(cartTotal(stallId));
    document.getElementById('review-btn').textContent = 'Review order \u00b7 ' + peso(cartTotal(stallId));

    document.getElementById('pay-title').textContent = t('payTitle');
    document.getElementById('pay-pills').innerHTML = PAYMENTS.map(function (p) {
      return '<button class="pay-pill' + (state.payment === p.id ? ' active' : '') + '" onclick="setPayment(\'' + p.id + '\')">' +
        '<span class="pay-emoji">' + p.emoji + '</span>' +
        '<span class="pay-name">' + p.name + '</span></button>';
    }).join('');
    document.getElementById('pay-note').textContent =
      state.payment === 'gcash' ? t('payGcash') : state.payment === 'maya' ? t('payMaya') : t('payCash');
  }

  function renderSheet() {
    var stallId = state.cartStall;
    document.getElementById('sheet-stall-name').textContent = stallById(stallId).name;
    document.getElementById('sheet-items').innerHTML = cartEntries(stallId).map(function (i) {
      return '<div class="sheet-row"><span>' + i.qty + ' \u00d7 ' + i.name + '</span><span class="muted">' + peso(i.price * i.qty) + '</span></div>';
    }).join('');
    document.getElementById('sheet-total').textContent = peso(cartTotal(stallId));
    document.getElementById('sheet-payment').textContent = payName(state.payment);
  }

  function renderTracking() {
    var body = document.getElementById('tracking-body');
    var actions = document.getElementById('tracking-actions');
    var order = null;
    for (var i = 0; i < state.orders.length; i++) {
      if (state.orders[i].id === state.myOrderId) { order = state.orders[i]; break; }
    }

    if (!order) {
      document.getElementById('tracking-stall-name').textContent = 'Beachfront Food Court';
      body.innerHTML = '<div class="empty-state">' +
        '<svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a6 6 0 0 0-6 6v3l-2 4h16l-2-4V8a6 6 0 0 0-6-6zm-2 16h4a2 2 0 0 1-4 0z"/></svg>' +
        '<div class="card-title">No orders yet</div>' +
        '<div class="card-subtitle">Order food from a stall and it will show up here.</div>' +
        '<button class="btn btn-orange" onclick="go(\'stalls\')">Order food</button>' +
      '</div>';
      actions.innerHTML = '';
      return;
    }

    document.getElementById('tracking-stall-name').textContent = order.stallName;
    var status = order.status;
    var FLOW = ['received', 'accepted', 'preparing', 'ready', 'served'];
    var idx = FLOW.indexOf(status);
    if (idx < 0) idx = 0;
    var steps = [
      { key: 'received', title: 'Received', color: 'blue', sub: order.receivedAt + ' \u00b7 The stall has your order' },
      { key: 'accepted', title: 'Accepted', color: 'teal', sub: 'The stall confirmed your order and will start cooking it.' },
      { key: 'preparing', title: 'Preparing', color: 'amber', sub: 'Your food is on the grill. About 10 minutes.' },
      { key: 'ready', title: 'Ready', color: 'green', sub: status === 'served' ? 'Served to ' + order.table + ' at ' + order.servedAt : 'We will bring it to ' + order.table + '. The bell will ring here.' }
    ];
    steps = steps.map(function (s) {
      var sIdx = FLOW.indexOf(s.key);
      return {
        title: s.title, color: s.color, sub: s.sub,
        now: s.key === status,
        done: sIdx < idx || status === 'served'
      };
    });

    var banner = '';
    if (state.readyAlert === 'shown' && (status === 'ready' || status === 'served')) {
      banner = '<div class="ready-banner">' +
        '<span class="ready-banner-icon">\ud83d\udd14</span>' +
        '<div class="ready-banner-text">' +
          '<div class="ready-banner-title">Order #' + order.id + ' is ready!</div>' +
          '<div class="ready-banner-sub">' + t('readyBanner') + ' \u00b7 ' + order.table + '</div>' +
        '</div>' +
        '<button class="ready-banner-btn" onclick="closeReadySheet()">Okay</button>' +
      '</div>';
    }

    var html = banner + '<div class="tracking-order">' +
      '<div class="tracking-order-label">Your order number</div>' +
      '<div class="tracking-order-number">' + order.id + '</div>' +
      '<div class="tracking-order-table">' + order.table + '</div>' +
    '</div><div class="progress">';

    steps.forEach(function (s, idx) {
      var isDone = s.done || s.now;
      var dotCls, titleCls, suffix;
      if (s.now) { dotCls = s.color; titleCls = s.color; suffix = ' \u2014 Now'; }
      else if (isDone) { dotCls = s.color; titleCls = s.color; suffix = ' \u2014 Done'; }
      else { dotCls = 'upcoming'; titleCls = 'upcoming'; suffix = ' \u2014 Next'; }

      var dotInner = '';
      if (isDone) dotInner = '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>';
      if (s.now && s.color === 'teal') dotInner = '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.5 14.5-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"/></svg>';
      if (s.now && s.color === 'amber') dotInner = '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4V6zm2 4h12l-1 8H7l-1-8z"/></svg>';
      if (s.now && s.color === 'green') dotInner = '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a6 6 0 0 0-6 6v3l-2 4h16l-2-4V8a6 6 0 0 0-6-6zm-2 16h4a2 2 0 0 1-4 0z"/></svg>';

      var last = idx === steps.length - 1;
      var nextDone = !last && (steps[idx + 1].done || steps[idx + 1].now);
      html += '<div class="progress-step">' +
        '<div class="progress-rail">' +
          '<div class="progress-dot ' + dotCls + '">' + dotInner + '</div>' +
          (last ? '' : '<div class="progress-line' + (nextDone ? ' done' : '') + '"></div>') +
        '</div>' +
        '<div class="progress-content">' +
          '<div class="progress-title ' + titleCls + '">' + s.title + suffix + '</div>' +
          '<div class="progress-subtitle">' + s.sub + '</div>' +
        '</div>' +
      '</div>';
    });
    html += '</div>';
    body.innerHTML = html;

    var btnLabel = state.serverCalled ? 'Server notified \u2713' : 'Need help? Call a server';
    actions.innerHTML =
      '<button class="btn btn-teal-outline btn-block" onclick="addMore(\'' + order.stallId + '\')">Add more items</button>' +
      '<button class="btn btn-teal-outline btn-block" onclick="callServer()"' + (state.serverCalled ? ' disabled' : '') + '>' + btnLabel + '</button>';
  }

  function addMore(stallId) { state.menuStall = stallId; go('menu'); }

  function renderHelp() {
    var body = document.getElementById('help-body');
    var sub = document.getElementById('help-sub');
    if (state.role === 'vendor') {
      sub.textContent = "Vendor \u00b7 Aling Rosa's Barbecue";
      body.innerHTML =
        '<div class="card"><div class="card-body">' +
          '<div class="card-title" style="font-size:16px;">Handling an order</div>' +
          '<div class="help-steps" style="margin-top:10px;">' +
            '<div class="help-step"><div class="help-step-num">1</div><div class="help-step-text"><strong>Received</strong><span>New orders appear in blue with a NEW tag. Tap Accept order to confirm you can cook it.</span></div></div>' +
            '<div class="help-step"><div class="help-step-num">2</div><div class="help-step-text"><strong>Accepted</strong><span>The customer sees this on their tracking screen. Tap Start preparing when you begin cooking.</span></div></div>' +
            '<div class="help-step"><div class="help-step-num">3</div><div class="help-step-text"><strong>Preparing</strong><span>Tap Mark Ready when the food is done. The customer gets a Ready alert.</span></div></div>' +
            '<div class="help-step"><div class="help-step-num">4</div><div class="help-step-text"><strong>Ready</strong><span>Tap Served to table once the food is delivered.</span></div></div>' +
          '</div>' +
        '</div></div>' +
        '<div class="card"><div class="card-body">' +
          '<div class="card-title" style="font-size:16px;">Seats</div>' +
          '<div class="faq-a">Update free seats from the Seats tab. Customers see Available, Few left, or Full on the Stalls screen.</div>' +
          '<button class="btn btn-teal-outline btn-block btn-sm" style="margin-top:10px;" onclick="go(\'vendorseats\')">Open Seats</button>' +
        '</div></div>' +
        '<div class="card"><div class="card-body">' +
          '<div class="card-title" style="font-size:16px;">Menu availability</div>' +
          '<div class="faq-a">Mark items sold out from the Menu tab. Customers cannot add sold-out items.</div>' +
          '<button class="btn btn-teal-outline btn-block btn-sm" style="margin-top:10px;" onclick="go(\'vendormenu\')">Open Menu</button>' +
        '</div></div>' +
        '<button class="btn btn-grey btn-block" onclick="resetDemo()">Reset demo</button>';
    } else {
      sub.textContent = 'Beachfront Food Court';
      var callBtn = state.serverCalled
        ? '<button class="btn btn-grey btn-block" disabled>Server notified \u2713</button>'
        : '<button class="btn btn-orange btn-block" onclick="callServer()">Call a server to Table 12</button>';
      body.innerHTML =
        '<div class="card"><div class="card-body">' +
          '<div class="card-title" style="font-size:16px;">How to order</div>' +
          '<div class="help-steps" style="margin-top:10px;">' +
            '<div class="help-step"><div class="help-step-num">1</div><div class="help-step-text"><strong>Pick a stall</strong><span>Tap a stall card to see its menu.</span></div></div>' +
            '<div class="help-step"><div class="help-step-num">2</div><div class="help-step-text"><strong>Add food</strong><span>Use + and \u2212 to build your cart.</span></div></div>' +
            '<div class="help-step"><div class="help-step-num">3</div><div class="help-step-text"><strong>Review and send</strong><span>Check the total, confirm, and the stall starts cooking.</span></div></div>' +
            '<div class="help-step"><div class="help-step-num">4</div><div class="help-step-text"><strong>Track it</strong><span>Watch Received, Preparing, and Ready on the Orders tab.</span></div></div>' +
          '</div>' +
        '</div></div>' +
        '<div class="card"><div class="card-body">' +
          '<div class="card-title" style="font-size:16px;">Need help at your table?</div>' +
          '<div class="faq-a">We will send a server to ' + TABLE + '.</div>' +
          '<div style="margin-top:10px;">' + callBtn + '</div>' +
        '</div></div>' +
        '<div class="card"><div class="card-body">' +
          '<div class="card-title" style="font-size:16px;margin-bottom:4px;">Questions</div>' +
          '<div class="faq-item"><div class="faq-q">Where is my food?</div><div class="faq-a">Open the Orders tab to see Received, Preparing, and Ready.</div></div>' +
          '<div class="faq-item"><div class="faq-q">Wrong table?</div><div class="faq-a">Your table comes from the QR code you scanned. Scan again at the right table.</div></div>' +
          '<div class="faq-item"><div class="faq-q">Can I order from two stalls?</div><div class="faq-a">Yes, but each order goes to one stall. The app will start a new cart for you.</div></div>' +
        '</div></div>' +
        '<button class="btn btn-grey btn-block" onclick="resetDemo()">Reset demo</button>';
    }
  }

  function renderVendor() {
    var aling = stallById('aling-rosa');
    var info = seatInfo(aling.free);
    document.getElementById('vendor-seats-label').textContent = 'Seats: ' + info.text;
    document.getElementById('vendor-seats-count').textContent = aling.free;

    var active = state.orders.filter(function (o) { return o.status !== 'served'; });
    var counts = { received: 0, accepted: 0, preparing: 0, ready: 0 };
    active.forEach(function (o) { if (counts[o.status] !== undefined) counts[o.status]++; });
    document.getElementById('count-received').textContent = counts.received;
    document.getElementById('count-accepted').textContent = counts.accepted;
    document.getElementById('count-preparing').textContent = counts.preparing;
    document.getElementById('count-ready').textContent = counts.ready;

    var alertWrap = document.getElementById('vendor-alert-wrap');
    var newOrder = null;
    active.forEach(function (o) { if (o.isNew && !newOrder) newOrder = o; });
    if (newOrder && !state.vendorAlertDismissed) {
      alertWrap.innerHTML = '<div class="vendor-alert">' +
        '<span class="vendor-alert-icon">\ud83d\udd14</span>' +
        '<div class="vendor-alert-text">' +
          '<div class="vendor-alert-title">New order #' + newOrder.id + ' from ' + newOrder.table + '</div>' +
          '<div class="vendor-alert-sub">' + newOrder.items + ' \u00b7 ' + payName(newOrder.payment) + '</div>' +
        '</div>' +
        '<button class="btn btn-orange btn-sm" onclick="advanceOrder(\'' + newOrder.id + '\')">Accept</button>' +
        '<button class="vendor-alert-dismiss" onclick="dismissVendorAlert()" aria-label="Dismiss">&times;</button>' +
      '</div>';
    } else {
      alertWrap.innerHTML = '';
    }

    var statusMeta = {
      received: { word: 'Received', color: 'blue', action: 'Accept order' },
      accepted: { word: 'Accepted', color: 'teal', action: 'Start preparing' },
      preparing: { word: 'Preparing', color: 'amber', action: 'Mark Ready' },
      ready: { word: 'Ready', color: 'green', action: 'Served to table' }
    };

    var wrap = document.getElementById('vendor-orders');
    if (active.length === 0) {
      wrap.innerHTML = '<div class="empty-state">' +
        '<svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a6 6 0 0 0-6 6v3l-2 4h16l-2-4V8a6 6 0 0 0-6-6zm-2 16h4a2 2 0 0 1-4 0z"/></svg>' +
        '<div class="card-title">No active orders</div>' +
        '<div class="card-subtitle">New orders from tables will appear here.</div>' +
      '</div>';
      return;
    }
    wrap.innerHTML = active.map(function (o) {
      var m = statusMeta[o.status];
      return '<div class="vendor-order">' +
        '<div class="vendor-order-edge ' + m.color + '"></div>' +
        '<div class="vendor-order-body">' +
          '<div class="vendor-order-top">' +
            '<span class="vendor-order-number">#' + o.id + (o.isNew ? '<span class="new-badge">NEW</span>' : '') + '</span>' +
            '<span class="vendor-order-table">' + o.table + '</span>' +
          '</div>' +
          '<div class="vendor-order-items">' + o.items + '</div>' +
          '<div class="vendor-order-footer">' +
            '<span class="vendor-order-status ' + m.color + '">' + m.word + '</span>' +
            '<span class="vendor-order-pay">' + payName(o.payment) + '</span>' +
            (o.status === 'ready'
              ? '<button class="btn btn-teal-outline btn-sm" onclick="advanceOrder(\'' + o.id + '\')">' + m.action + '</button>'
              : '<button class="btn btn-orange btn-sm" onclick="advanceOrder(\'' + o.id + '\')">' + m.action + '</button>') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function renderVendorMenu() {
    var aling = stallById('aling-rosa');
    document.getElementById('vendor-menu-list').innerHTML = aling.menu.map(function (m) {
      var sold = !!state.soldOut[m.id];
      return '<div class="vendor-item">' +
        '<div class="vendor-item-info">' +
          '<span class="vendor-item-name">' + m.emoji + ' ' + m.name + '</span>' +
          '<span class="vendor-item-price">' + peso(m.price) + (sold ? ' \u00b7 Sold out' : '') + '</span>' +
        '</div>' +
        (sold
          ? '<button class="btn btn-teal-outline btn-sm" onclick="toggleSoldOut(\'' + m.id + '\')">Mark available</button>'
          : '<button class="btn btn-grey btn-sm" onclick="toggleSoldOut(\'' + m.id + '\')">Mark sold out</button>') +
      '</div>';
    }).join('');
  }

  function renderVendorSeats() {
    var aling = stallById('aling-rosa');
    var info = seatInfo(aling.free);
    document.getElementById('seats-hero-count').textContent = aling.free;
    var statusEl = document.getElementById('seats-hero-status');
    statusEl.className = 'seats-hero-status ' + info.cls;
    statusEl.textContent = info.word;
  }

  function renderOnboard() {
    document.getElementById('scan-title').textContent = t('scanTitle');
    document.getElementById('scan-note').textContent = t('scanNote');
    document.getElementById('scan-btn').textContent = t('scanBtn');
    document.getElementById('scan-demo').textContent = t('scanDemo');
    document.getElementById('lt-title').textContent = t('ltTitle');
    document.getElementById('lt-lang-title').textContent = t('ltLangTitle');
    document.getElementById('lt-table-note').textContent = t('ltTableNote');
    document.getElementById('lt-check-title').textContent = t('ltCheckTitle');
    document.getElementById('lt-check-sub').textContent = t('ltCheckSub');
    document.getElementById('lt-confirm').textContent = t('ltConfirm');
    document.getElementById('stalls-q').textContent = t('stallsQ');
    document.getElementById('stalls-table-note').textContent = t('tableNote');
    document.getElementById('lang-en').classList.toggle('active', state.lang === 'en');
    document.getElementById('lang-ceb').classList.toggle('active', state.lang === 'ceb');
  }

  function render() {
    renderNavs();
    renderFlow();
    renderOnboard();
    renderStalls();
    renderMenu();
    renderCart();
    renderSheet();
    renderTracking();
    renderHelp();
    renderVendor();
    renderVendorMenu();
    renderVendorSeats();
  }

  function fitShell() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (window.visualViewport) {
      w = Math.min(w, window.visualViewport.width);
      h = Math.min(h, window.visualViewport.height);
    }
    var scale = Math.min(w / 390, h / 844);
    document.querySelector('.app-shell').style.transform = 'scale(' + scale + ')';
  }
  window.addEventListener('resize', fitShell);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', fitShell);
  fitShell();

  render();

  setTimeout(function () {
    document.getElementById('splash').classList.add('hide');
  }, 2400);
