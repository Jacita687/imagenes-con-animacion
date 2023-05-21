window.requestAnimFrame = (function() {
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();


        var Demo = {

            loaded: 0,
            drag: false,
            speed: 0.5,
            brake: 1,
            r: 0,

            Down: function(e) {
                Demo.o = Demo.r;
                Demo.x = Demo.r + e.clientX;
                Demo.drag = true;
                Demo.time = new Date();
            },

            Move: function(e) {
                if (Demo.drag) {
                    Demo.r = Demo.x - e.clientX;
                    Demo.p.style.webkitTransform = 'rotateY(' + Demo.r * 180 / 400 + 'deg)';
                    Demo.p.style.mozTransform = 'rotateY(' + Demo.r * 180 / 400 + 'deg)';
                    Demo.p.style.transform = 'rotateY(' + Demo.r * 180 / 400 + 'deg)';
                }
            },

            Up: function() {
                if (Demo.drag) {
                    var time = new Date() - Demo.time;
                    var path = Demo.r - Demo.o;
                    Demo.speed = path / time * 5;
                    Demo.brake = 1.01;
                    Demo.drag = false;
                }
            },

            Spin: function() {
                if (!Demo.drag) {
                    Demo.r += Demo.speed;
                    Demo.speed /= Demo.brake;
                    Demo.p.style.webkitTransform = 'rotateY(' + Demo.r * 180 / 400 + 'deg)';
                    Demo.p.style.mozTransform = 'rotateY(' + Demo.r * 180 / 400 + 'deg)';
                    Demo.p.style.transform = 'rotateY(' + Demo.r * 180 / 400 + 'deg)';
                }
                window.requestAnimFrame(Demo.Spin);
            },

            Bind: function() {
                Demo.e.addEventListener('mousedown', Demo.Down, false);
                Demo.e.addEventListener('mousemove', Demo.Move, false);
                Demo.e.addEventListener('mouseup', Demo.Up, false);
                Demo.e.addEventListener('mouseleave', Demo.Up, false);
                window.requestAnimFrame(Demo.Spin);
            },

            Init: function() {
                Demo.e = document.getElementById('demo');
                Demo.p = document.getElementById('panorama');
                Demo.l = document.getElementById('loader');
                Demo.Bind();
            }
        };


        document.addEventListener('DOMContentLoaded', Demo.Init, false);