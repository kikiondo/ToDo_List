(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name) {
    _classCallCheck(this, Task);

    this.id = new Date().getTime();
    this.name = name;
    this.isComplete = false;
    return this;
};

exports.default = Task;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoList = function () {
    function ToDoList(key) {
        _classCallCheck(this, ToDoList);

        this.key = key;

        if (!_helpers.ls.getItem(key)) _helpers.ls.setItem(key, _helpers.j.stringify([]));

        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    _createClass(ToDoList, [{
        key: 'addTask',
        value: function addTask(e) {
            //c(e)
            if (!e.target.value) alert('No puedes agregar una tarea vacia');

            if (e.keyCode === _helpers.ENTER_KEY) {
                var newTask = new _Task2.default(e.target.value),
                    tasks = _helpers.j.parse(_helpers.ls.getItem(this.key));

                tasks.push(newTask);
                _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks));
                this.renderTask(newTask);
                e.target.value = null;
                //c(newTask, tasks, ls)
            }
        }
    }, {
        key: 'editTask',
        value: function editTask(e) {
            var _this = this;

            if (e.target.localName === 'label') {
                //alert('funciona')
                var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
                    toEdit = tasks.findIndex(function (task) {
                    return task.name === e.target.textContent;
                }),
                    label = _helpers.d.querySelector('[data-id="' + tasks[toEdit].id + '"]');
                //c(tasks, toEdit, tasks[toEdit])

                var saveTask = function saveTask(e) {
                    e.target.textContent = e.target.textContent;
                    tasks[toEdit].name = e.target.textContent;
                    _helpers.ls.setItem(_this.key, _helpers.j.stringify(tasks));
                    e.target.blur();
                };

                label.addEventListener('blur', function (e) {
                    return saveTask(e);
                }); //Cuando pierda el foco
                label.addEventListener('keyup', function (e) {
                    return e.keyCode === _helpers.ENTER_KEY && saveTask(e);
                });
            }
        }
    }, {
        key: 'removeTask',
        value: function removeTask(e) {
            //Bind del metodo
            (0, _helpers.c)(e);
            if (e.target.localName === 'a') {
                //alert('eliminar')
                var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
                    toRemove = tasks.findIndex(function (task) {
                    return task.id.toString() === e.target.dataset.id;
                }); //Cuando el id de la tarea sea igual a ....
                //Dataser es un arreglo que genera js 
                //Buena practica es no utilizar 2 iguales ya que solo comparamos valor. Lo mejor es === o !=

                tasks.splice(toRemove, 1);
                _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks));
                e.target.parentElement.remove();
            }
        }
    }, {
        key: 'renderTask',
        value: function renderTask(task) {
            var templateTask = '\n            <li class="List-item ' + (task.isComplete ? 'complete' : '') + '">\n                <input id="' + task.id + '" type="checkbox" class="List-checkbox" ' + (task.isComplete ? 'checked' : '') + '>\n                <label data-id="' + task.id + '" class="List-label" contenteditable  spellcheck>' + task.name + '</label>\n                <a href="#" data-id="' + task.id + '" class="List-removeLink">&#128465;</a>\n            </li>\n        ';
            list.insertAdjacentHTML('beforeend', templateTask);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
                listTasks = list.children;
            //c(tasks, listTasks)

            tasks.forEach(function (task) {
                return _this2.renderTask(task);
            });

            Array.from(listTasks).forEach(function (input) {
                /*Aparentemente es un arreglo pero solo es uno o lista de nodos, o html collection.
                 por si solo, es por eso que se agrega un Array.from() -> Es un casting.*/
                input.querySelector('input[type="checkbox"]').addEventListener('change', function (e) {
                    var task = tasks.filter(function (task) {
                        return task.id == e.target.id;
                    });
                    //c(task)

                    if (e.target.checked) {
                        e.target.parentElement.classList.add('complete');
                        task[0].isComplete = true;
                    } else {
                        e.target.parentElement.classList.remove('complete');
                        task[0].isComplete = false;
                    }

                    _helpers.ls.setItem(_this2.key, _helpers.j.stringify(tasks));
                });
            });

            task.addEventListener('keyup', this.addTask);
            list.addEventListener('click', this.editTask);
            list.addEventListener('click', this.removeTask);
        }
    }]);

    return ToDoList;
}();

exports.default = ToDoList;

},{"./Task":1,"./helpers":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//Filosofia de los modulos
//Los elementos del dom los voy a guardar y exportar

var ENTER_KEY = 13,
    c = console.log,
    d = document,
    j = JSON,
    ls = localStorage;

// Destructuración
exports.ENTER_KEY = ENTER_KEY;
exports.c = c;
exports.d = d;
exports.j = j;
exports.ls = ls;

},{}],4:[function(require,module,exports){
'use strict';

var _helpers = require('./helpers');

var _ToDoList = require('./ToDoList');

var _ToDoList2 = _interopRequireDefault(_ToDoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Llamando al modulo por destructuración 
var task = _helpers.d.querySelector('#task'),
    list = _helpers.d.querySelector('#list'),
    todo = new _ToDoList2.default('edList'); //Todo lo que guarde en la edList se guardare en el localStorage

todo.render();

},{"./ToDoList":2,"./helpers":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvVGFzay5qcyIsInNyYy9qcy9Ub0RvTGlzdC5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7SUNBcUIsSSxHQUNqQixjQUFZLElBQVosRUFBaUI7QUFBQTs7QUFDYixTQUFLLEVBQUwsR0FBVSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQVY7QUFDQSxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsQzs7a0JBTmdCLEk7Ozs7Ozs7Ozs7O0FDQXJCOztBQUNBOzs7Ozs7OztJQUVxQixRO0FBQ2pCLHNCQUFZLEdBQVosRUFBaUI7QUFBQTs7QUFDYixhQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBLFlBQUksQ0FBQyxZQUFHLE9BQUgsQ0FBVyxHQUFYLENBQUwsRUFDSSxZQUFHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLFdBQUUsU0FBRixDQUFZLEVBQVosQ0FBaEI7O0FBRUosYUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFmO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FBaEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQWxCO0FBQ0g7Ozs7Z0NBRU8sQyxFQUFHO0FBQ1A7QUFDQSxnQkFBSSxDQUFDLEVBQUUsTUFBRixDQUFTLEtBQWQsRUFDSSxNQUFNLG1DQUFOOztBQUVKLGdCQUFJLEVBQUUsT0FBRix1QkFBSixFQUE2QjtBQUN6QixvQkFBSSxVQUFVLG1CQUFTLEVBQUUsTUFBRixDQUFTLEtBQWxCLENBQWQ7QUFBQSxvQkFDSSxRQUFRLFdBQUUsS0FBRixDQUFR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UUFDQSxDLEdBQUEsQztRQUNBLEMsR0FBQSxDO1FBQ0EsRSxHQUFBLEU7Ozs7O0FDZFI7O0FBQ0E7Ozs7OztBQUZBO0FBSUEsSUFBTSxPQUFPLFdBQUUsYUFBRixDQUFnQixPQUFoQixDQUFiO0FBQUEsSUFDSSxPQUFPLFdBQUUsYUFBRixDQUFnQixPQUFoQixDQURYO0FBQUEsSUFFSSxPQUFPLHVCQUFhLFFBQWIsQ0FGWCxDLENBRWtDOztBQUU5QixLQUFLLE1BQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2t7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKXtcclxuICAgICAgICB0aGlzLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2VcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRU5URVJfS0VZLCBjLCBkLCBqLCBscyB9IGZyb20gJy4vaGVscGVycydcclxuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3Ioa2V5KSB7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBrZXlcclxuXHJcbiAgICAgICAgaWYgKCFscy5nZXRJdGVtKGtleSkpXHJcbiAgICAgICAgICAgIGxzLnNldEl0ZW0oa2V5LCBqLnN0cmluZ2lmeShbXSkpXHJcblxyXG4gICAgICAgIHRoaXMuYWRkVGFzayA9IHRoaXMuYWRkVGFzay5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5lZGl0VGFzayA9IHRoaXMuZWRpdFRhc2suYmluZCh0aGlzKVxyXG4gICAgICAgIHRoaXMucmVtb3ZlVGFzayA9IHRoaXMucmVtb3ZlVGFzay5iaW5kKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFzayhlKSB7XHJcbiAgICAgICAgLy9jKGUpXHJcbiAgICAgICAgaWYgKCFlLnRhcmdldC52YWx1ZSlcclxuICAgICAgICAgICAgYWxlcnQoJ05vIHB1ZWRlcyBhZ3JlZ2FyIHVuYSB0YXJlYSB2YWNpYScpXHJcblxyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IEVOVEVSX0tFWSkge1xyXG4gICAgICAgICAgICBsZXQgbmV3VGFzayA9IG5ldyBUYXNrKGUudGFyZ2V0LnZhbHVlKSxcclxuICAgICAgICAgICAgICAgIHRhc2tzID0gai5wYXJzZShscy5nZXRJdGVtKHRoaXMua2V5KSlcclxuXHJcbiAgICAgICAgICAgIHRhc2tzLnB1c2gobmV3VGFzaylcclxuICAgICAgICAgICAgbHMuc2V0SXRlbSh0aGlzLmtleSwgai5zdHJpbmdpZnkodGFza3MpKVxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhc2sobmV3VGFzaylcclxuICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBudWxsXHJcbiAgICAgICAgICAgIC8vYyhuZXdUYXNrLCB0YXNrcywgbHMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUYXNrKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQubG9jYWxOYW1lID09PSAnbGFiZWwnKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoJ2Z1bmNpb25hJylcclxuICAgICAgICAgICAgbGV0IHRhc2tzID0gai5wYXJzZShscy5nZXRJdGVtKHRoaXMua2V5KSksXHJcbiAgICAgICAgICAgICAgICB0b0VkaXQgPSB0YXNrcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLm5hbWUgPT09IGUudGFyZ2V0LnRleHRDb250ZW50KSxcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7dGFza3NbdG9FZGl0XS5pZH1cIl1gKVxyXG4gICAgICAgICAgICAvL2ModGFza3MsIHRvRWRpdCwgdGFza3NbdG9FZGl0XSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNhdmVUYXNrID0gZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICAgICAgICB0YXNrc1t0b0VkaXRdLm5hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICAgICAgbHMuc2V0SXRlbSh0aGlzLmtleSwgai5zdHJpbmdpZnkodGFza3MpKVxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuYmx1cigpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxhYmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBlID0+IHNhdmVUYXNrKGUpKSAvL0N1YW5kbyBwaWVyZGEgZWwgZm9jb1xyXG4gICAgICAgICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4gKGUua2V5Q29kZSA9PT0gRU5URVJfS0VZKSAmJiBzYXZlVGFzayhlKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVGFzayhlKSB7XHJcbiAgICAgICAgLy9CaW5kIGRlbCBtZXRvZG9cclxuICAgICAgICBjKGUpXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmxvY2FsTmFtZSA9PT0gJ2EnKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoJ2VsaW1pbmFyJylcclxuICAgICAgICAgICAgbGV0IHRhc2tzID0gai5wYXJzZShscy5nZXRJdGVtKHRoaXMua2V5KSksXHJcbiAgICAgICAgICAgICAgICB0b1JlbW92ZSA9IHRhc2tzLmZpbmRJbmRleCh0YXNrID0+IHRhc2suaWQudG9TdHJpbmcoKSA9PT0gZS50YXJnZXQuZGF0YXNldC5pZCkvL0N1YW5kbyBlbCBpZCBkZSBsYSB0YXJlYSBzZWEgaWd1YWwgYSAuLi4uXHJcbiAgICAgICAgICAgIC8vRGF0YXNlciBlcyB1biBhcnJlZ2xvIHF1ZSBnZW5lcmEganMgXHJcbiAgICAgICAgICAgIC8vQnVlbmEgcHJhY3RpY2EgZXMgbm8gdXRpbGl6YXIgMiBpZ3VhbGVzIHlhIHF1ZSBzb2xvIGNvbXBhcmFtb3MgdmFsb3IuIExvIG1lam9yIGVzID09PSBvICE9XHJcblxyXG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UodG9SZW1vdmUsIDEpXHJcbiAgICAgICAgICAgIGxzLnNldEl0ZW0odGhpcy5rZXksIGouc3RyaW5naWZ5KHRhc2tzKSlcclxuICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJUYXNrKHRhc2spIHtcclxuICAgICAgICBsZXQgdGVtcGxhdGVUYXNrID0gYFxyXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJMaXN0LWl0ZW0gJHt0YXNrLmlzQ29tcGxldGUgPyAnY29tcGxldGUnIDogJyd9XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCIke3Rhc2suaWR9XCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJMaXN0LWNoZWNrYm94XCIgJHt0YXNrLmlzQ29tcGxldGUgPyAnY2hlY2tlZCcgOiAnJ30+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pZD1cIiR7dGFzay5pZH1cIiBjbGFzcz1cIkxpc3QtbGFiZWxcIiBjb250ZW50ZWRpdGFibGUgIHNwZWxsY2hlY2s+JHt0YXNrLm5hbWV9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS1pZD1cIiR7dGFzay5pZH1cIiBjbGFzcz1cIkxpc3QtcmVtb3ZlTGlua1wiPiYjMTI4NDY1OzwvYT5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICBgXHJcbiAgICAgICAgbGlzdC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlVGFzaylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHRhc2tzID0gai5wYXJzZShscy5nZXRJdGVtKHRoaXMua2V5KSksXHJcbiAgICAgICAgICAgIGxpc3RUYXNrcyA9IGxpc3QuY2hpbGRyZW5cclxuICAgICAgICAvL2ModGFza3MsIGxpc3RUYXNrcylcclxuXHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHRoaXMucmVuZGVyVGFzayh0YXNrKSlcclxuXHJcbiAgICAgICAgQXJyYXkuZnJvbShsaXN0VGFza3MpLmZvckVhY2goaW5wdXQgPT4geyBcclxuICAgICAgICAgICAgLypBcGFyZW50ZW1lbnRlIGVzIHVuIGFycmVnbG8gcGVybyBzb2xvIGVzIHVubyBvIGxpc3RhIGRlIG5vZG9zLCBvIGh0bWwgY29sbGVjdGlvbi5cclxuICAgICAgICAgICAgIHBvciBzaSBzb2xvLCBlcyBwb3IgZXNvIHF1ZSBzZSBhZ3JlZ2EgdW4gQXJyYXkuZnJvbSgpIC0+IEVzIHVuIGNhc3RpbmcuKi9cclxuICAgICAgICAgICAgaW5wdXQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suaWQgPT0gZS50YXJnZXQuaWQpXHJcbiAgICAgICAgICAgICAgICAvL2ModGFzaylcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKVxyXG4gICAgICAgICAgICAgICAgICAgIHRhc2tbMF0uaXNDb21wbGV0ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFza1swXS5pc0NvbXBsZXRlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBscy5zZXRJdGVtKHRoaXMua2V5LCBqLnN0cmluZ2lmeSh0YXNrcykpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGFzay5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuYWRkVGFzaylcclxuICAgICAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzaylcclxuICAgICAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVUYXNrKVxyXG4gICAgfVxyXG59IiwiLy9GaWxvc29maWEgZGUgbG9zIG1vZHVsb3NcclxuLy9Mb3MgZWxlbWVudG9zIGRlbCBkb20gbG9zIHZveSBhIGd1YXJkYXIgeSBleHBvcnRhclxyXG5cclxuY29uc3QgRU5URVJfS0VZID0gMTMsXHJcbiAgICBjID0gY29uc29sZS5sb2csXHJcbiAgICBkID0gZG9jdW1lbnQsXHJcbiAgICBqID0gSlNPTixcclxuICAgIGxzID0gbG9jYWxTdG9yYWdlXHJcblxyXG4vLyBEZXN0cnVjdHVyYWNpw7NuXHJcbiAgICBleHBvcnR7XHJcbiAgICAgICAgRU5URVJfS0VZLFxyXG4gICAgICAgIGMsXHJcbiAgICAgICAgZCxcclxuICAgICAgICBqLFxyXG4gICAgICAgIGxzXHJcbiAgICB9IiwiLy9MbGFtYW5kbyBhbCBtb2R1bG8gcG9yIGRlc3RydWN0dXJhY2nDs24gXHJcbmltcG9ydCB7ZH0gZnJvbSAnLi9oZWxwZXJzJ1xyXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9Ub0RvTGlzdCdcclxuXHJcbmNvbnN0IHRhc2sgPSBkLnF1ZXJ5U2VsZWN0b3IoJyN0YXNrJyksXHJcbiAgICBsaXN0ID0gZC5xdWVyeVNlbGVjdG9yKCcjbGlzdCcpLFxyXG4gICAgdG9kbyA9IG5ldyBUb0RvTGlzdCgnZWRMaXN0JykgLy9Ub2RvIGxvIHF1ZSBndWFyZGUgZW4gbGEgZWRMaXN0IHNlIGd1YXJkYXJlIGVuIGVsIGxvY2FsU3RvcmFnZVxyXG5cclxuICAgIHRvZG8ucmVuZGVyKCkiXX0=
