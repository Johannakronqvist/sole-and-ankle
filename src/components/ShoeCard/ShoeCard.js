import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <SalesTag salesTag={variant === 'default' ? '' : variant}>
            {variant === 'on-sale'
              ? 'Sale'
              : variant === 'new-release'
              ? 'Just Released'
              : null}
          </SalesTag>
          <Image alt='' src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>

          <Price
            style={{
              '--color': variant === 'on-sale' ? COLORS.gray[700] : null,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : null,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>

          {salePrice ? (
            <SalePrice salePrice={salePrice}>
              {formatPrice(salePrice)}
            </SalePrice>
          ) : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const SalesTag = styled.span`
  position: absolute;
  background-color: ${(props) =>
    props.salesTag === 'on-sale'
      ? COLORS.primary
      : props.salesTag === 'new-release'
      ? COLORS.secondary
      : null};
  color: ${COLORS.white};
  top: 12px;
  right: -4px;
  line-height: 32px;
  padding: 0px 10px;
  border-radius: 2px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
