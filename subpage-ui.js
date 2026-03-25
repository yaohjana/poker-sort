/**
 * 子頁面共用：主容器入場、鍵盤小幫手（與首頁體驗一致）
 */
(function () {
    'use strict';

    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    onReady(function () {
        var container = document.querySelector('.page-frame .container');
        if (container) {
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    container.classList.add('app-loaded');
                });
            });
        }

        function staggerCards(selector) {
            document.querySelectorAll(selector).forEach(function (el, i) {
                el.style.setProperty('--sub-stagger', String(i));
            });
        }

        staggerCards('.lesson-wrap > .lesson-card');
        staggerCards('.con-wrap > .con-card');
        staggerCards('.lab-wrap > .lab-card');
        staggerCards('.guide-wrap > .lesson-card');

        if (location.hash) {
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    var target = document.querySelector(location.hash);
                    if (target && typeof target.scrollIntoView === 'function') {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var ruleBox = document.getElementById('logic-rule-box');
            if (ruleBox && ruleBox.style.display === 'block') {
                ruleBox.style.display = 'none';
                e.preventDefault();
            }
        });
    });
}());
