import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '#ui-kit/Button';
import Icon from '#ui-kit/Icon';
import Input from '#ui-kit/Input';
import { H2, Regular16 } from '#ui-kit/Text';

import Container from '#components/Container';

import { useDispatch } from '#store';
import { AppActions } from '#store/slices/app';
import { ProductsActions, ProductsSelectors } from '#store/slices/products';

import styles from './index.module.css';

const Drawer: React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> = ({ children, className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState('');
  const products = useSelector(ProductsSelectors.selectAll);

  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.tabbar}>
        <div
          className={styles.button}
          onClick={() => setIsActive(true)}
        >
          <Icon
            name="list"
            size={32}
          />
        </div>
      </div>
      <div
        className={`${styles.container} ${className}`}
        style={{
          left: isActive ? '0px' : '-424px',
        }}
      >
        <div className={styles.header}>
          <div className={styles.close}>
            <div
              className={styles.button}
              onClick={() => setIsActive(false)}
            >
              <Icon name="close" />
            </div>
          </div>
          <Input
            label="Поиск"
            value={search}
            onChange={setSearch}
          />
        </div>
        <div className={styles.products}>
          {products
            .filter(el => (search ? el.name.includes(search) : true))
            .map(product => (
              <Container className={styles['product-container']}>
                <div className={styles.productHeader}>
                  <H2>{product.name}</H2>
                  <div
                    className={styles.closeProduct}
                    onClick={() =>
                      dispatch(ProductsActions.deleteOne(product.id))
                    }
                  >
                    <Icon name="close" />
                  </div>
                </div>
                <div className={styles.nutrients}>
                  <div className={styles.nutrient}>
                    <Icon
                      className={styles.icon}
                      name="proteins"
                      size={24}
                    />
                    <Regular16>
                      {
                        +(
                          product?.per_100?.proteins || product.proteins
                        ).toFixed(1)
                      }{' '}
                      г{' '}
                    </Regular16>
                  </div>
                  <div className={styles.nutrient}>
                    <Icon
                      className={styles.icon}
                      name="carbs"
                      size={24}
                    />
                    <Regular16>
                      {+(product?.per_100?.carbs || product.carbs).toFixed(1)} г{' '}
                    </Regular16>
                  </div>
                  <div className={styles.nutrient}>
                    <Icon
                      className={styles.icon}
                      name="fats"
                      size={24}
                    />
                    <Regular16>
                      {+(product?.per_100?.fat || product.fat).toFixed(1)} г{' '}
                    </Regular16>
                  </div>
                  <div className={styles.nutrient}>
                    <Icon
                      className={styles.icon}
                      name="calories"
                      size={24}
                    />
                    <Regular16>{+product.kcal.toFixed(1)} </Regular16>
                  </div>
                </div>
                <Button
                  label="Открыть"
                  onPress={() => {
                    setIsActive(false);
                    dispatch(AppActions.setActiveProduct(product));
                  }}
                />
              </Container>
            ))}
        </div>
        {children}
      </div>
    </>
  );
};

export default Drawer;
