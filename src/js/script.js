
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  //ドロワーメニュー
  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
    } else {
      $(".js-hamburger").addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
      $(".header").addClass("is-open");
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
  $(".js-hamburger").click(function () {
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
      disableOnInteraction: false,//ユーザーがスライドを操作しても、自動再生が止まらない
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

    const scrollHeight = $(document).height();/*ページ全体の高さ*/
    const scrollPosition = $(window).height() + $(window).scrollTop();/*ページの一番上からスクロールされた距離*/
    const footHeight = $('footer').outerHeight();/*フッターの高さ*/

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
//要素の取得とスピードの設定
var box = $('.colorbox'),
  speed = 700;

//.colorboxの付いた全ての要素に対して下記の処理を行う
box.each(function () {
  $(this).append('<div class="color"></div>')
  var color = $(this).find($('.color')),
    image = $(this).find('img');
  var counter = 0;

  image.css('opacity', '0');
  color.css('width', '0%');
  //inviewを使って背景色が画面に現れたら処理をする
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
$(document).ready(function () {
  // 画像がクリックされたときの処理
  $('.js-modal-open').on('click', function (e) {
    e.preventDefault(); // リンクのデフォルト動作を無効化

    const imgSrc = $(this).data('image'); // data-imageの値を取得
    $('.modal__image').attr('src', imgSrc); // モーダル内の画像にsrcを設定
    const imgIndex = $(this).data('index'); // data-index属性から画像番号を取得

    $('.js-modal').fadeIn(); // モーダルを表示
    $('.modal__image').css('opacity', '1'); // 画像の透明度を1に設定
    // スクロールを無効にするために body にクラスを追加
    $('body').addClass('no-scroll');
    // 画像が1枚目または6枚目なら50vwに設定、それ以外は100vw
    if (imgIndex === 1 || imgIndex === 6) {
      $('.modal__content').css('width', '50vw');
    } else {
      $('.modal__content').css('width', '100vw');
    }
  });
});

// モーダルを閉じるときの処理
$('.js-modal-close').on('click', function () {
  $('.js-modal').fadeOut(function () {
    $('.modal__image').css('opacity', '0');
  });

  // スクロールを有効にするためにクラスを削除
  $('body').removeClass('no-scroll');
});

//タブ
$(function () {
  const tabButton = $(".js-tab-button"),
    tabContent = $(".js-tab-content");
  tabButton.on("click", function () {
    let index = tabButton.index(this);
    tabButton.removeClass("is-active");
    $(this).addClass("is-active");
    tabContent.removeClass("is-active");
    tabContent.eq(index).addClass("is-active");
  });
});

//サイドバーアのコーディオン
$(function () {
  $(".js-accordion-title").on("click", function () {
    $(this).next().slideToggle(300);
    $(this).toggleClass("open", 300);
  });
});

//FAQのアコーディオン
$(document).ready(function () {
  // 初期状態でcurrentクラスが付いている項目を開いた状態にする
  $('.accordion__content.current').each(function () {
    $(this).show(); // 内容を表示
    $(this).prev('.accordion__header').addClass('is-open'); // 見出しにis-openクラスを追加
  });
  // タイトルをクリックした場合
  $('.accordion__header').click(function () {
    // アコーディオン（内容）の開閉
    $(this).next('.accordion__content').slideToggle(200);
    // タイトルにopenクラスを付与または削除してプラスマイナス可変
    $(this).toggleClass("is-open", 200);
  });
});

//コンタクトフォームのバリデーション
$(document).ready(function() {
  $(".page-contact__button").on("click", function(event) {
      // エラーメッセージボックスを一旦非表示
      $(".page-contact__error-box").hide();

      // フォームが有効かどうかを示すフラグ
      let isValid = true;

      // 必須項目をチェックし、未入力の項目にエラースタイルを適用
      $(".js-form").find("input[required], textarea[required], select[required]").each(function() {
          if ($(this).val().trim() === "") {
              // 未入力の場合、`use-invalid`クラスを追加してエラースタイルを適用
              $(this).addClass("use-invalid");
              isValid = false;
          } else {
              // 入力されている場合は`use-invalid`クラスを削除して正常スタイルに戻す
              $(this).removeClass("use-invalid");
          }
      });

      // フォームが無効な場合、エラーメッセージボックスを表示し、ページを最上部に移動
      if (!isValid) {
          $(".page-contact__error-box").show();

          // ページを最上部に即座に移動
          window.scrollTo(0, 0);

          // フォーム送信をキャンセル
          return false;
      }
  });
});

