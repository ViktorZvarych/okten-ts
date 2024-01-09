interface ICar {
    id?: number;
    brand: string;
    price: number;
    year: number;
}

const CarService = {
    getAll: (): Promise<ICar[]> => fetch('http://owu.linkpc.net/carsAPI/v1/cars')
        .then(res => res.json()),

    add: (newCar: ICar): Promise<ICar[]> => fetch('http://owu.linkpc.net/carsAPI/v1/cars', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar)
    }).then(res => res.json()),

    delete: (id: number): Promise<Response> => fetch(`http://owu.linkpc.net/carsAPI/v1/cars/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: `${id}`
    }),

    info: (id: number): Promise<Response> => fetch(`http://owu.linkpc.net/carsAPI/v1/cars/${id}`),

    edit: (editedCar: ICar): Promise<Response> => fetch(`http://owu.linkpc.net/carsAPI/v1/cars/${editedCar.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCar)
    }),
}

class CarRender {
    static run(): void {
        console.log('Car is running');
        this._showCars();
        this._initAddCarForm();
    }

    private static async _showCars(): Promise<void> {
        const carsList = document.getElementById('cars') as HTMLOListElement;
        carsList.innerHTML = '';
        const cars: ICar[] = await CarService.getAll();
        cars.reverse();
        cars.forEach(car => {
            const {id, brand, year, price} = car;
            const carItem = document.createElement('li');
            // carItem.classList.add('flex')

            const carInfo = document.createElement('p');
            carInfo.innerText = `id: ${id}, brand: ${brand}, year: ${year}, price: ${price}`;

            const buttonsDiv = document.createElement('div');
            // buttonsDiv.classList.add('flex');

            const infoButton = document.createElement('button');
            infoButton.innerText = 'Info';
            const carInfoArticle = document.getElementById('car-info') as HTMLElement;
            infoButton.onclick = () => {
                carInfoArticle.innerHTML = '';

                const carInfoP = document.createElement('p');
                carInfoP.innerText = `
                id: ${id},
                brand: ${brand},
                year: ${year},
                price: ${price}
                `;

                carInfoArticle.appendChild(carInfoP);
            }

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            const editDiv = document.createElement('div');

            editButton.onclick = () => {
                editDiv.innerHTML = '';
                const editP = document.createElement('p');
                editP.innerText = `edit: ${brand} , ${year}, ${price}`;
                editDiv.appendChild(editP);
                carItem.appendChild(editDiv);
            }

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = async () => {
                await CarService.delete(id);
                this._showCars();
            }

            buttonsDiv.append(infoButton, editButton, deleteButton);
            carItem.append(carInfo, buttonsDiv)
            carsList.appendChild(carItem);
        })
    }

    private static async _initAddCarForm(): Promise<void> {
        const addCarForm = document.forms.namedItem('add-car') as HTMLFormElement;

        const brandInput = addCarForm.brand as HTMLInputElement;
        const priceInput = addCarForm.price as HTMLInputElement;
        const yearInput = addCarForm.year as HTMLInputElement;

        addCarForm.onsubmit = async (e: SubmitEvent) => {
            e.preventDefault();

            const brand = brandInput.value;
            const price = priceInput.value;
            const year = yearInput.value;

            const newCar: ICar = {
                brand: brand,
                price: +price,
                year: +year
            }

            await CarService.add(newCar);
            console.log(newCar);

            addCarForm.reset();
            this._showCars();
        }
    }
}

CarRender.run();



// ---------try CarService---
const logCars = async () => console.log((await CarService.getAll()));
// logCars();

const newCar: ICar = {
    brand: 'Nissan',
    price: 370000,
    year: 2015,
}
const addNewCar = async (car: ICar) => (await CarService.add(car));
// addNewCar(newCar).then(value=> logCars());

const deleteCar = async (id: number) => (await CarService.delete(id));
// deleteCar(10095).then(value => logCars())