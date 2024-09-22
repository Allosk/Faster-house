jQuery(function(o) {
    o(".woocommerce-ordering").on("change", "select.orderby", function() {
        o(this).closest("form").trigger("submit")
    }), o("input.qty:not(.product-quantity input.qty)").each(function() {
        var e = parseFloat(o(this).attr("min"));
        e >= 0 && parseFloat(o(this).val()) < e && o(this).val(e)
    });
    var e = "store_notice" + (o(".woocommerce-store-notice").data("noticeId") || "");
    "hidden" === Cookies.get(e) ? o(".woocommerce-store-notice").hide() : o(".woocommerce-store-notice").show(), o(".woocommerce-store-notice__dismiss-link").on("click", function(s) {
        Cookies.set(e, "hidden", {
            path: "/"
        }), o(".woocommerce-store-notice").hide(), s.preventDefault()
    }), o(".woocommerce-input-wrapper span.description").length && o(document.body).on("click", function() {
        o(".woocommerce-input-wrapper span.description:visible").prop("aria-hidden", !0).slideUp(250)
    }), o(".woocommerce-input-wrapper").on("click", function(o) {
        o.stopPropagation()
    }), o(".woocommerce-input-wrapper :input").on("keydown", function(e) {
        var s = o(this).parent().find("span.description");
        if (27 === e.which && s.length && s.is(":visible")) return s.prop("aria-hidden", !0).slideUp(250), e.preventDefault(), !1
    }).on("click focus", function() {
        var e = o(this).parent(),
            s = e.find("span.description");
        e.addClass("currentTarget"), o(".woocommerce-input-wrapper:not(.currentTarget) span.description:visible").prop("aria-hidden", !0).slideUp(250), s.length && s.is(":hidden") && s.prop("aria-hidden", !1).slideDown(250), e.removeClass("currentTarget")
    }), o.scroll_to_notices = function(e) {
        e.length && o("html, body").animate({
            scrollTop: e.offset().top - 100
        }, 1e3)
    }, o('.woocommerce form .woocommerce-Input[type="password"]').wrap('<span class="password-input"></span>'), o(".woocommerce form input").filter(":password").parent("span").addClass("password-input"), o(".password-input").append('<span class="show-password-input"></span>'), o(".show-password-input").on("click", function() {
        o(this).hasClass("display-password") ? o(this).removeClass("display-password") : o(this).addClass("display-password"), o(this).hasClass("display-password") ? o(this).siblings(['input[type="password"]']).prop("type", "text") : o(this).siblings('input[type="text"]').prop("type", "password")
    }), o("a.coming-soon-footer-banner-dismiss").on("click", function(e) {
        var s = o(e.target);
        o.ajax({
            type: "post",
            url: s.data("rest-url"),
            data: {
                meta: {
                    woocommerce_coming_soon_banner_dismissed: "yes"
                }
            },
            beforeSend: function(o) {
                o.setRequestHeader("X-WP-Nonce", s.data("rest-nonce"))
            },
            complete: function() {
                o("#coming-soon-footer-banner").hide()
            }
        })
    })
});