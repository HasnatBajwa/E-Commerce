import React from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';
import { client } from '../lib/client';
const Home = ({ products, banner}) => (

    <>
      <HeroBanner heroBanner={banner && banner[1]} />
      {console.log(banner)}
      <div className='products-heading'>
        <h2>
          Best Selling Products
        </h2>
        <p>
          Speakers of many variations
        </p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product key={product.id} product={product}/>)}
      </div>
      < FooterBanner footerBanner={banner && banner[1]} />
    </>
  );
export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);
  return {
    props: {products,banner}
  }
}
export default Home;