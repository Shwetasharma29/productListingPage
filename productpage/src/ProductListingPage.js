import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);
    const [getcategories,setgetcategories] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
     let produstbycategory={};
    useEffect(() => {
        fetchProducts();
    }, []);
    const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;
    const ProductImage = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  `;

    const ProductName = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
  `;
    const ProductCard = styled.div`
    width: 200px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  `;
    const ProductPrice = styled.div`
    font-size: 14px;
  `;

    const ProductStock = styled.div`
    font-size: 12px;
    color: red;
    margin-top: 5px;
  `;
const Dropdown = styled. div`
display: flex;
gap:2%;`;
  const getcategory = (data) => {

    let categoryWiseProduct={}

    for(let i=0;i<data.length;i++){
if(!categoryWiseProduct[data[i].category]){
    categoryWiseProduct[data[i].category]=[];
}

    categoryWiseProduct[data[i].category].push(data[i]);

    }
    return categoryWiseProduct
  }
 
    
    const fetchProducts = async () => {
        try {
            const response = await axios.get(" https://dummyjson.com/products?limit=100");
            setProducts(response.data.products);
            setgetcategories(getcategory(response.data.products))
        } catch (error) {
            console.error('Error fetching products:', error)
        }
       
    }
    const handleOptionChange = event => {
        setSelectedOption(event.target.value);
        if(event.target.value=="All" )fetchProducts();

        else setProducts(getcategories[event.target.value])
      };
      const sortProducts = (products, sortBy) => {
        console.log(products,"hhh")
        return [...products].sort((a, b) => {
          if (sortBy === 'rating1') {
            return b.rating - a.rating;
          } 
          else if (sortBy === 'rating2') {
            return a.rating - b.rating;
          }
          else if (sortBy === 'discountPercentage1') {
            return b.discountPercentage - a.discountPercentage;
          } 
          else if (sortBy === 'discountPercentage2') {
            return a.discountPercentage - b.discountPercentage;
          }
          else if (sortBy === 'price1') {
            return a.price - b.price;
          }
          else if (sortBy === 'price2') {
            return b.price - a.price;
          }
          return 0;
        });
      };
      const handleSortChange= async (event)=>{
        console.log("hello")
        setSelectedSort(event.target.value);
      let ans=  await sortProducts(products,event.target.value)
        setProducts(ans)
        
      }
    return (
        <div>
            
            <h1>Product Listing Page</h1>
             
             {/* choose category */}
             <Dropdown>
             <select value={selectedOption} onChange={handleOptionChange}>
                <option value="All">All Category</option>
             {Object.entries(getcategories).map(([category]) => (
                <option value={category} >{category}</option>
             ))}
             </select>
           
           {/* sort By */}
             <select value={selectedSort} onChange={handleSortChange}>
                <option>Sort By</option>

                <option value="price1">Price(Low to high)</option>
                <option value="price2">Price(high to low)</option>
                <option value="rating1">rating(Low to high)</option>
                <option value="rating2">rating(high to low)</option>
                <option value="discountPercentage1"> discount(Low to high)</option>
                <option value="discountPercentage2"> discount(high to low)</option>
             </select>
             </Dropdown>


            <ProductContainer>
                {products?.map((product)=>{
                return(
                <ProductCard key={product.id}>
                    <ProductImage src={product.images[0]}/>
                    <ProductName>{product.title}</ProductName>
                    <ProductPrice>price: ${product.price}</ProductPrice>
                    {product.stock < 50 && (
                        <ProductStock>Hurry! Only a few items left.</ProductStock>
                     )}
                </ProductCard>
                )})}
            </ProductContainer>
        </div>
    )
}

export default ProductListingPage;