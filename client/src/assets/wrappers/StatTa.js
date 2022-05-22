import styled from 'styled-components'

const Wrapper = styled.article`
  padding: 1rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-left: 5px solid #764B8E;
  border-bottom: 5px solid #764B8E;
  display:flex;
  flex-direction:column ;
  align-items: center;
  justify-content: center;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:10px;
  }
  .name {
    display: block;
    font-weight: 500;
    font-size: 25px;
    color: #764B8E;
  }
  .iconName {
    width: 40px;
    height: 30px;
    background:#E5D3E8 ;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1.25rem;
      color: #764B8E};
    }
  .count {
    display: block;
    font-weight: 500;
    font-size: 20px;
    color: #764B8E;
  }
  .iconCount {
    width: 30px;
    height: 25px;
    background:#E5D3E8 ;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1rem;
      color: #764B8E};
    }

`

export default Wrapper