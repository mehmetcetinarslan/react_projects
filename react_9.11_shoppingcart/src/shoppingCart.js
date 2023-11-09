import React, { useState } from 'react';

const marketItems = [
  { itemname: "Patates", itemPrice: 15.99 },
  { itemname: "Soğan", itemPrice: 13.99 },
  { itemname: "Domates", itemPrice: 25.99 },
  { itemname: "Kıvırcık", itemPrice: 10.99 },
  { itemname: "Kiraz", itemPrice: 20.99 },
];

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newPrice, setnewPrice] = useState();
  const [selectedItem, setSelectedItem] = useState("Ürün Seçiniz");
  const [count, setCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = () => {
    if (newItem) {
      setCart([...cart, { itemname: newItem, itemPrice: newPrice }]);
      setNewItem("");
      setSelectedItem("Ürün Seçiniz");
      setCounter(count + 1);
      setTotalPrice(totalPrice + newPrice);
    }
  };

  const deleteItem = (index, price) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
    setCounter(count - 1);
    setTotalPrice(totalPrice - price);
  };

  const onOptionChangeHandler = (event) => {
    setSelectedItem(event.target.value);
    setNewItem(event.target.value);
    const selectedMarketItem = marketItems.find(
      (item) => item.itemname === event.target.value
    );
    if (selectedMarketItem) {
      setnewPrice(selectedMarketItem.itemPrice);
    }
  };

  return (
    <div>
      <h1 className='mb-3'>E-Market</h1>

      <select value={selectedItem} onChange={onOptionChangeHandler}>
        <option disabled>Ürün Seçiniz</option>
        {marketItems.map((item, index) => (
          <option key={index} value={item.itemname}>
            {item.itemname} - {item.itemPrice}TL
          </option>
        ))}
      </select>

      <button className='mb-1 btn btn-primary btn-sm ' onClick={addItem}>Ürün Ekle</button>

      <div>
        <h2 className='mb-3'>Alışveriş Sepeti</h2>
        <div className='mb-3'>Sepetteki Toplam Ürün Sayısı: {count}</div>
        <div className='mb-3'>Sepetteki Toplam Fiyat: {totalPrice.toFixed(2)} TL</div>
        {cart.map((item, index) => (
          <div key={index}>
            <p>
              {index + 1}. Ürün   <p className='text-bg-success'>{item.itemname} - {item.itemPrice} TL</p>
              
              <button className=' btn-sm  btn btn-danger' onClick={() => deleteItem(index, item.itemPrice)}>Sil</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingCart;
