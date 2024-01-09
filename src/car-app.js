var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var CarService = {
    getAll: function () { return fetch('http://owu.linkpc.net/carsAPI/v1/cars')
        .then(function (res) { return res.json(); }); },
    add: function (newCar) { return fetch('http://owu.linkpc.net/carsAPI/v1/cars', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar)
    }).then(function (res) { return res.json(); }); },
    delete: function (id) { return fetch("http://owu.linkpc.net/carsAPI/v1/cars/".concat(id), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: "".concat(id)
    }); },
    info: function (id) { return fetch("http://owu.linkpc.net/carsAPI/v1/cars/".concat(id)); },
    edit: function (editedCar) { return fetch("http://owu.linkpc.net/carsAPI/v1/cars/".concat(editedCar.id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCar)
    }); },
};
var CarRender = /** @class */ (function () {
    function CarRender() {
    }
    CarRender.run = function () {
        console.log('Car is running');
        this._showCars();
        this._initAddCarForm();
    };
    CarRender._showCars = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carsList, cars;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        carsList = document.getElementById('cars');
                        carsList.innerHTML = '';
                        return [4 /*yield*/, CarService.getAll()];
                    case 1:
                        cars = _a.sent();
                        cars.reverse();
                        cars.forEach(function (car) {
                            var id = car.id, brand = car.brand, year = car.year, price = car.price;
                            var carItem = document.createElement('li');
                            // carItem.classList.add('flex')
                            var carInfo = document.createElement('p');
                            carInfo.innerText = "id: ".concat(id, ", brand: ").concat(brand, ", year: ").concat(year, ", price: ").concat(price);
                            var buttonsDiv = document.createElement('div');
                            // buttonsDiv.classList.add('flex');
                            var infoButton = document.createElement('button');
                            infoButton.innerText = 'Info';
                            var carInfoArticle = document.getElementById('car-info');
                            infoButton.onclick = function () {
                                carInfoArticle.innerHTML = '';
                                var carInfoP = document.createElement('p');
                                carInfoP.innerText = "\n                id: ".concat(id, ",\n                brand: ").concat(brand, ",\n                year: ").concat(year, ",\n                price: ").concat(price, "\n                ");
                                carInfoArticle.appendChild(carInfoP);
                            };
                            var editButton = document.createElement('button');
                            editButton.innerText = 'Edit';
                            var editDiv = document.createElement('div');
                            editButton.onclick = function () {
                                editDiv.innerHTML = '';
                                var editP = document.createElement('p');
                                editP.innerText = "edit: ".concat(brand, " , ").concat(year, ", ").concat(price);
                                editDiv.appendChild(editP);
                                carItem.appendChild(editDiv);
                            };
                            var deleteButton = document.createElement('button');
                            deleteButton.innerText = 'Delete';
                            deleteButton.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, CarService.delete(id)];
                                        case 1:
                                            _a.sent();
                                            this._showCars();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            buttonsDiv.append(infoButton, editButton, deleteButton);
                            carItem.append(carInfo, buttonsDiv);
                            carsList.appendChild(carItem);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CarRender._initAddCarForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var addCarForm, brandInput, priceInput, yearInput;
            var _this = this;
            return __generator(this, function (_a) {
                addCarForm = document.forms.namedItem('add-car');
                brandInput = addCarForm.brand;
                priceInput = addCarForm.price;
                yearInput = addCarForm.year;
                addCarForm.onsubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var brand, price, year, newCar;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                e.preventDefault();
                                brand = brandInput.value;
                                price = priceInput.value;
                                year = yearInput.value;
                                newCar = {
                                    brand: brand,
                                    price: +price,
                                    year: +year
                                };
                                return [4 /*yield*/, CarService.add(newCar)];
                            case 1:
                                _a.sent();
                                console.log(newCar);
                                addCarForm.reset();
                                this._showCars();
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/];
            });
        });
    };
    return CarRender;
}());
CarRender.run();
// ---------try CarService---
var logCars = function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = console).log;
            return [4 /*yield*/, CarService.getAll()];
        case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent())])];
    }
}); }); };
// logCars();
var newCar = {
    brand: 'Nissan',
    price: 370000,
    year: 2015,
};
var addNewCar = function (car) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, CarService.add(car)];
        case 1: return [2 /*return*/, (_a.sent())];
    }
}); }); };
// addNewCar(newCar).then(value=> logCars());
var deleteCar = function (id) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, CarService.delete(id)];
        case 1: return [2 /*return*/, (_a.sent())];
    }
}); }); };
// deleteCar(10095).then(value => logCars())
