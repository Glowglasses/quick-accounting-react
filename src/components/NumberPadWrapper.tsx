import styled from 'styled-components';
const NumberPadWrapper = styled.div`
  font-weight: bold;
  font-size: 1.1em;
  > .inputs {
    > label {
      display: inline-block;
      width: 50%;
      vertical-align: bottom;
      border-top: 1px solid #D3D3D3;
      font-family: Consolas, monospace;

      &:nth-child(1) {
        border-right: 1px solid #D3D3D3;
      }

      > input {
        width: 60%;
      }

      > span {
        padding-left: 5px;
      }
    }
  }

  > .buttons {
    > button {
      height: 70px;
      width: 20%;

      &.date {
        font-size: 13px;
      }

      &:nth-child(1) {
        border-bottom: 1px solid #D3D3D3;
        border-top: 1px solid #D3D3D3;
      }

      &:nth-child(2) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
        border-top: 1px solid #D3D3D3;
      }

      &:nth-child(3) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
        border-top: 1px solid #D3D3D3;
      }

      &:nth-child(4) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
        border-top: 1px solid #D3D3D3;
      }

      &:nth-child(5) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
        border-top: 1px solid #D3D3D3;
      }

      &:nth-child(6) {
        border-bottom: 1px solid #D3D3D3;
      }

      &:nth-child(7) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
      }

      &:nth-child(8) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
      }

      &:nth-child(9) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
      }

      &:nth-child(10) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
      }

      &:nth-child(11) {
        border-bottom: 1px solid #D3D3D3;
      }

      &:nth-child(12) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
      }

      &:nth-child(13) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
      }

      &:nth-child(14) {
        border-bottom: 1px solid #D3D3D3;
        border-left: 1px solid #D3D3D3;
      }

      &.ok {
        float: right;
        border-left: 1px solid #D3D3D3;
        height: 140px;
      }

      &:nth-child(16) {
      }

      &:nth-child(17) {
        border-left: 1px solid #D3D3D3;
      }

      &:nth-child(18) {
        border-left: 1px solid #D3D3D3;
        font-size: 13px;
      }

      &:nth-child(19) {
        border-left: 1px solid #D3D3D3;
      }
    }
  }
  @keyframes clickAnimation{
    0% {background-color: #FFF;}
    50% {background-color: #C0C0C0;}
    100%{background-color: #FFF;}
  }
`
export {NumberPadWrapper}