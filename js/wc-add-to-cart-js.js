jQuery(function(t) {
    if ("undefined" == typeof wc_add_to_cart_params) return !1;
    var a = function() {
        this.requests = [], this.addRequest = this.addRequest.bind(this), this.run = this.run.bind(this), t(document.body).on("click", ".add_to_cart_button:not(.wc-interactive)", {
            addToCartHandler: this
        }, this.onAddToCart).on("click", ".remove_from_cart_button", {
            addToCartHandler: this
        }, this.onRemoveFromCart).on("added_to_cart", this.updateButton).on("ajax_request_not_sent.adding_to_cart", this.updateButton).on("added_to_cart removed_from_cart", {
            addToCartHandler: this
        }, this.updateFragments)
    };
    a.prototype.addRequest = function(t) {
        this.requests.push(t), 1 === this.requests.length && this.run()
    }, a.prototype.run = function() {
        var a = this,
            e = a.requests[0].complete;
        a.requests[0].complete = function() {
            "function" == typeof e && e(), a.requests.shift(), a.requests.length > 0 && a.run()
        }, t.ajax(this.requests[0])
    }, a.prototype.onAddToCart = function(a) {
        var e = t(this);
        if (e.is(".ajax_add_to_cart")) {
            if (!e.attr("data-product_id")) return !0;
            if (a.preventDefault(), e.removeClass("added"), e.addClass("loading"), !1 === t(document.body).triggerHandler("should_send_ajax_request.adding_to_cart", [e])) return t(document.body).trigger("ajax_request_not_sent.adding_to_cart", [!1, !1, e]), !0;
            var r = {};
            t.each(e.data(), function(t, a) {
                r[t] = a
            }), t.each(e[0].dataset, function(t, a) {
                r[t] = a
            }), t(document.body).trigger("adding_to_cart", [e, r]), a.data.addToCartHandler.addRequest({
                type: "POST",
                url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "add_to_cart"),
                data: r,
                success: function(a) {
                    a && (a.error && a.product_url ? window.location = a.product_url : "yes" !== wc_add_to_cart_params.cart_redirect_after_add ? t(document.body).trigger("added_to_cart", [a.fragments, a.cart_hash, e]) : window.location = wc_add_to_cart_params.cart_url)
                },
                dataType: "json"
            })
        }
    }, a.prototype.onRemoveFromCart = function(a) {
        var e = t(this),
            r = e.closest(".woocommerce-mini-cart-item");
        a.preventDefault(), r.block({
            message: null,
            overlayCSS: {
                opacity: .6
            }
        }), a.data.addToCartHandler.addRequest({
            type: "POST",
            url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "remove_from_cart"),
            data: {
                cart_item_key: e.data("cart_item_key")
            },
            success: function(a) {
                a && a.fragments ? t(document.body).trigger("removed_from_cart", [a.fragments, a.cart_hash, e]) : window.location = e.attr("href")
            },
            error: function() {
                window.location = e.attr("href")
            },
            dataType: "json"
        })
    }, a.prototype.updateButton = function(a, e, r, d) {
        (d = void 0 !== d && d) && (d.removeClass("loading"), e && d.addClass("added"), e && !wc_add_to_cart_params.is_cart && 0 === d.parent().find(".added_to_cart").length && d.after('<a href="' + wc_add_to_cart_params.cart_url + '" class="added_to_cart wc-forward" title="' + wc_add_to_cart_params.i18n_view_cart + '">' + wc_add_to_cart_params.i18n_view_cart + "</a>"), t(document.body).trigger("wc_cart_button_updated", [d]))
    }, a.prototype.updateFragments = function(a, e) {
        e && (t.each(e, function(a) {
            t(a).addClass("updating").fadeTo("400", "0.6").block({
                message: null,
                overlayCSS: {
                    opacity: .6
                }
            })
        }), t.each(e, function(a, e) {
            t(a).replaceWith(e), t(a).stop(!0).css("opacity", "1").unblock()
        }), t(document.body).trigger("wc_fragments_loaded"))
    }, new a
});