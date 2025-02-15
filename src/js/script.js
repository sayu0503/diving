
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  //ドロワーメニュー
  $(".js-hamburger ").click(function () {
    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
    } else {
      $(this).addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
      $(".header").addClass("is-open");
    }
  });

  //メニュー内リンクのクリック処理
  $(".js-sp-nav a").click(function (event) {
    const target = $(this).attr("href");

    if (target.startsWith("#")) {
      event.preventDefault();
      const position = $(target).offset().top;

      $("html, body").animate({ scrollTop: position }, 500);

      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
    } else {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
    }
  });

  //PC幅にしたときハンバーガーメニューとドロワーを閉じる
  $(window).resize(function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
      $("body").css({ height: "", overflow: "" });
    }
  });

  //ハンバーガーメニュー展開時背景をスクロールさせない方法
  $(".js-hamburger .js-sp-nav").click(function () {
    if ($("body").css("overflow") === "hidden") {
      $("body").css({ height: "", overflow: "" });
    } else {
      $("body").css({ height: "100%", overflow: "hidden" });
    }
  });

  //メインビュースライド
  var swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  });

  //ヘッダーの背景色変更
  const header = $("#js-header");
  const hero = $("#js-mv");
  $(window).on("scroll", function () {
    console.log($(this).scrollTop());
    const heroHeight = hero.height();
    console.log("mv height:" + heroHeight);
    if ($(this).scrollTop() > heroHeight) {
      header.addClass("is-dark");
    } else {
      header.removeClass("is-dark");
    }
  });

  //Campaignスライド
  var swiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    width: 284,
    speed: 1500,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      // 768px以上の場合
      768: {
        slidesPerView: 3.5,
        spaceBetween: 40,
        width: 1265.5,
      }
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

//スクロールイベントでページトップボタンを表示/非表示
$(function () {
  $(".js-page-top").hide();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 70) {
      $(".js-page-top").fadeIn();
    } else {
      $(".js-page-top").fadeOut();
    }
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = $('footer').outerHeight();

    if (scrollHeight - scrollPosition <= footHeight) {
      $(".js-page-top").css({
        "position": "absolute",
        "bottom": 16 + footHeight,
      });
    } else {
      $(".js-page-top").css({
        "position": "fixed",
        "bottom": "16px",
      });
    }
  });
});

//背景色の後に画像やテキストが表示されるエフェクト
var box = $('.colorbox'),
  speed = 700;
box.each(function () {
  $(this).append('<div class="color"></div>')
  var color = $(this).find($('.color')),
    image = $(this).find('img');
  var counter = 0;
  image.css('opacity', '0');
  color.css('width', '0%');
  color.on('inview', function () {
    if (counter == 0) {
      $(this).delay(200).animate({ 'width': '100%' }, speed, function () {
        image.css('opacity', '1');
        $(this).css({ 'left': '0', 'right': 'auto' });
        $(this).animate({ 'width': '0%' }, speed);
      })
      counter = 1;
    }
  });
});

//モーダルウィンドウ
$(".js-modal-open").on("click", function () {
  const imgSrc = $(this).find("img").attr("src");
  $(".js-modal-img").attr("src", imgSrc);
  $(".js-modal").addClass("is-open");
  $("body").addClass("no-scroll");
});

$(".js-modal").on("click", function (e) {
  if (!$(e.target).closest(".js-modal-img").length) {
    $(this).removeClass("is-open");
    $("body").removeClass("no-scroll");
  }
});

//タブ
$(function () {
  const tabButton = $(".js-tab-button"),
        tabContent = $(".js-tab-content");

  function handleHashChange(hash) {
    if (hash) {
      const targetTab = $(hash);
      if (targetTab.length) {
        // タブの切り替え
        tabButton.removeClass("is-active");
        tabContent.removeClass("is-active");

        const index = tabContent.index(targetTab);
        tabButton.eq(index).addClass("is-active");
        targetTab.addClass("is-active");

        // スクロール位置を調整
        const offset = 220;
        $("html, body").animate(
          { scrollTop: targetTab.offset().top - offset },
          300
        );
      }
    }
  }

  // ページロード時のハッシュ処理
  handleHashChange(window.location.hash);

  // タブボタンのクリックイベント
  tabButton.on("click", function () {
    let index = tabButton.index(this);
    // タブ切り替え
    tabButton.removeClass("is-active");
    $(this).addClass("is-active");
    tabContent.removeClass("is-active");
    tabContent.eq(index).addClass("is-active");
  });

  // ページ内リンククリック時の処理
  $("a[href^='#']").on("click", function (e) {
    e.preventDefault();
    const targetHash = $(this).attr("href");
    handleHashChange(targetHash); // ハッシュ処理を呼び出す
  });

  // ハッシュ変更時の処理（ブラウザの戻るボタンなどの対応）
  $(window).on("hashchange", function () {
    handleHashChange(window.location.hash);
  });
});


//サイドバーのコーディオン
$(function () {
  $(".js-accordion-title.is-open").next().show();
  $(".js-accordion-title").on("click", function () {
    $(this).next().slideToggle(300);
    $(this).toggleClass("is-open", 300);
  });
});

//FAQのアコーディオン
$(document).ready(function () {
  $('.accordion__content').each(function () {
    $(this).show();
  });
  $('.accordion__header').click(function () {
    $(this).next('.accordion__content').slideToggle(200);
    $(this).toggleClass("is-open", 200);
  });
});

//コンタクトフォームのバリデーション
$(document).ready(function () {
  $(".page-contact__button").on("click", function (event) {
    $(".page-contact__error-box").hide();
    let isValid = true;
    $(".js-form").find("input[required], textarea[required], select[required]").each(function () {
      if ($(this).val().trim() === "") {
        $(this).addClass("use-invalid");
        isValid = false;
      } else {
        $(this).removeClass("use-invalid");
      }
    });
    if ($(".page-contact__checkbox-group input[type='checkbox']:checked").length === 0) {
      $(".page-contact__checkbox-group input[type='checkbox']").addClass("use-invalid");
      $(".page-contact__checkbox-error").show();
      isValid = false;
    }
    if (!isValid) {
      $(".page-contact__error-box").show();
      window.scrollTo(0, 0);
      return false;
    }
    window.location.href = "page-thanks.html";
  });
  $(".page-contact__checkbox-group input[type='checkbox']").on("change", function () {
    if ($(".page-contact__checkbox-group input[type='checkbox']:checked").length > 0) {
      $(".page-contact__checkbox-group input[type='checkbox']").removeClass("use-invalid");
    }
  });
});

