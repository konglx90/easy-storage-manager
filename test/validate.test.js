// const expect = require('chai').expect;
// const validate = require('../src/validate').validateEngine;
//
// const VALIDATE_TEST_CASES = [
//     {
//         title: 'validate string:string',
//         validate: 'string',
//         data: 'ok',
//         expect: true,
//     },
//     {
//         title: 'validate string:number',
//         validate: 'number',
//         data: 1,
//         expect: true,
//     },
//     {
//         title: 'validate string:string',
//         validate: 'array',
//         data: [],
//         expect: true,
//     },
//     {
//         title: 'validate string:object true',
//         validate: {
//             name: 'string',
//             count: 'number'
//         },
//         data: {
//             name: 'kong',
//             count: 1,
//         },
//         expect: true,
//     },
//     {
//         title: 'validate string:object false',
//         validate: {
//             name: 'string',
//             count: 'number'
//         },
//         data: {
//             name: 'kong',
//         },
//         expect: false,
//     },
//     {
//         title: 'validate string:string|number 1',
//         validate: 'string|number',
//         data: 'ok',
//         expect: true,
//     },
//     {
//         title: 'validate string:string|number 2',
//         validate: 'string|number',
//         data: 1,
//         expect: true,
//     },
//     {
//         title: 'validate string:null 1',
//         validate: 'null',
//         data: null,
//         expect: true,
//     },
//     {
//         title: 'validate string:null 2',
//         validate: 'null',
//         data: 'null',
//         expect: false,
//     },
//     {
//         // TODO change it to a Error
//         title: 'validate string:null can not use null to validate null, must use "null" string',
//         validate: null,
//         data: null,
//         expect: false,
//     },
//     {
//         title: 'validate string:undefined',
//         validate: 'undefined',
//         data: undefined,
//         expect: true,
//     },
//     {
//         title: 'validate array:empty',
//         validate: [],
//         data: [],
//         expect: true,
//     },
//     {
//         title: 'validate array:string',
//         validate: ['number'],
//         data: [1],
//         expect: true,
//     },
//     {
//         title: 'validate array:string',
//         validate: ['string'],
//         data: ['122'],
//         expect: true,
//     },
//     {
//         title: 'validate array:string',
//         validate: ['string'],
//         data: ['122', 9090],
//         expect: false,
//     },
//     {
//         title: 'validate array:object',
//         validate: [{
//             name: 'string',
//         }],
//         data: [{
//             name: 'kong',
//         }, {
//             name: 'ling'
//         }],
//         expect: true,
//     },
//     {
//         title: 'validate array:object deep',
//         validate: [{
//             name: 'string',
//             girlFrends: [
//                 {
//                     name: 'string',
//                     friends: [
//                         {
//                             name: 'string',
//                             classmates: [
//                                 {
//                                     hobbies: []
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }],
//         data: [{
//             name: 'kong',
//             girlFrends: [
//                 {
//                     name: 'xiaomei',
//                     friends: [
//                         {
//                             name: 'xiaoming',
//                             classmates: [
//                                 {
//                                     hobbies: []
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }],
//         expect: true,
//     },
//     {
//         title: 'validate empty object:string',
//         validate: {},
//         data: 'ok',
//         expect: false,
//     },
// ]
//
// describe('expect validate', () => {
//   VALIDATE_TEST_CASES.forEach(c => {
//           it(c.title, () => {
//               expect(validate(c.validate, c.data)).to.be.equal(c.expect);
//           });
//       });
// });
