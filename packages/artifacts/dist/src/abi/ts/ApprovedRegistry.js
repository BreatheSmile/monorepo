"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovedRegistry = {
    "contractName": "ApprovedRegistry",
    "abi": [
        {
            "constant": true,
            "inputs": [],
            "name": "wrappedEther",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "approvedContractArray",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "approvedContractMapping",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "approvedTokenArray",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "approvedTokenMapping",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "kyberProxy",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_kyberAddress",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "target",
                    "type": "address"
                }
            ],
            "name": "ContractAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "target",
                    "type": "address"
                }
            ],
            "name": "ContractRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "target",
                    "type": "address"
                }
            ],
            "name": "TokenAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "target",
                    "type": "address"
                }
            ],
            "name": "TokenRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getRateFor",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "addApprovedContract",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "name": "_isWETH",
                    "type": "bool"
                }
            ],
            "name": "addApprovedToken",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "removeApprovedContract",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "removeApprovedToken",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getApprovedContracts",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getApprovedTokens",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "isContractAuthorised",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "isTokenAuthorised",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b506040516020806116ee83398101806040528101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061162a806100c46000396000f3006080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305a93322146100f6578063135171be1461014d57806314671a2914610190578063169c045d146101e757806317761786146102365780632a13d3f6146102a35780633a3b6deb146102fe578063565eec481461036b5780635705987a146103c65780636afc0c5f14610409578063862ea1ba146104755780638da5cb5b146104e15780639eea227914610538578063b23eadb71461057b578063ec18e22e146105d2578063f0eeed811461062d578063f2fde38b14610684575b600080fd5b34801561010257600080fd5b50610137600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106c7565b6040518082815260200191505060405180910390f35b34801561015957600080fd5b5061018e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108c7565b005b34801561019c57600080fd5b506101a56109ed565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101f357600080fd5b50610234600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050610a13565b005b34801561024257600080fd5b5061026160048036038101908080359060200190929190505050610bcd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102af57600080fd5b506102e4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c0b565b604051808215151515815260200191505060405180910390f35b34801561030a57600080fd5b5061032960048036038101908080359060200190929190505050610c2b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561037757600080fd5b506103ac600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c69565b604051808215151515815260200191505060405180910390f35b3480156103d257600080fd5b50610407600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d36565b005b34801561041557600080fd5b5061041e610fd9565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610461578082015181840152602081019050610446565b505050509050019250505060405180910390f35b34801561048157600080fd5b5061048a611067565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156104cd5780820151818401526020810190506104b2565b505050509050019250505060405180910390f35b3480156104ed57600080fd5b506104f66110f5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561054457600080fd5b50610579600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061111a565b005b34801561058757600080fd5b506105bc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061134d565b6040518082815260200191505060405180910390f35b3480156105de57600080fd5b50610613600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611365565b604051808215151515815260200191505060405180910390f35b34801561063957600080fd5b50610642611432565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561069057600080fd5b506106c5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611458565b005b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663809a9e558473eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee670de0b6b3a76400006040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506040805180830381600087803b1580156107de57600080fd5b505af11580156107f2573d6000803e3d6000fd5b505050506040513d604081101561080857600080fd5b810190808051906020019092919080519060200190929190505050915050600081111561087b5780600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508091506108c1565b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905591505b50919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561092257600080fd5b80600080151561093183611365565b151514151561093f57600080fd5b60058390806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508273ffffffffffffffffffffffffffffffffffffffff167f89c66952b48f3e96bf1d8ba1b63189520fd988a6979b8b740bd5c5d8dc53e20560405160405180910390a2505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a6e57600080fd5b816000801515610a7d83610c69565b1515141515610a8b57600080fd5b60068490806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060011515831515148015610b3d57506000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15610b845783600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b8373ffffffffffffffffffffffffffffffffffffffff167f784c8f4dbf0ffedd6e72c76501c545a70f8b203b30a26ce542bf92ba87c248a460405160405180910390a250505050565b600581815481101515610bdc57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528060005260406000206000915054906101000a900460ff1681565b600681815481101515610c3a57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000808473ffffffffffffffffffffffffffffffffffffffff1614151515610c9357600080fd5b60009150600090505b600680549050811015610d2c578373ffffffffffffffffffffffffffffffffffffffff16600682815481101515610ccf57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610d1f5760019150610d2c565b8080600101915050610c9c565b8192505050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d9357600080fd5b600090505b600680549050811015610f59578173ffffffffffffffffffffffffffffffffffffffff16600682815481101515610dcb57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610f4c576006600160068054905003815481101515610e2957fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600682815481101515610e6357fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506006805480919060019003610ec091906115ad565b50600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600090558173ffffffffffffffffffffffffffffffffffffffff167f4c910b69fe65a61f7531b9c5042b2329ca7179c77290aa7e2eb3afa3c8511fd360405160405180910390a2610f59565b8080600101915050610d98565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610fd557600460006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5050565b6060600680548060200260200160405190810160405280929190818152602001828054801561105d57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611013575b5050505050905090565b606060058054806020026020016040519081016040528092919081815260200182805480156110eb57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116110a1575b5050505050905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561117757600080fd5b600090505b600580549050811015611349578173ffffffffffffffffffffffffffffffffffffffff166005828154811015156111af57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561133c57600560016005805490500381548110151561120d57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660058281548110151561124757fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060058054809190600190036112a491906115ad565b50600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff02191690558173ffffffffffffffffffffffffffffffffffffffff167f8d30d41865a0b811b9545d879520d2dde9f4cc49e4241f486ad9752bc904b56560405160405180910390a2611349565b808060010191505061117c565b5050565b60016020528060005260406000206000915090505481565b6000806000808473ffffffffffffffffffffffffffffffffffffffff161415151561138f57600080fd5b60009150600090505b600580549050811015611428578373ffffffffffffffffffffffffffffffffffffffff166005828154811015156113cb57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561141b5760019150611428565b8080600101915050611398565b8192505050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114b357600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156114ef57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b8154818355818111156115d4578183600052602060002091820191016115d391906115d9565b5b505050565b6115fb91905b808211156115f75760008160009055506001016115df565b5090565b905600a165627a7a72305820dca11c1567433c16cd3e6e6d73bd1f21d4994751afa84f898a523641b96d299d0029",
    "compiler": {
        "name": "solc",
        "version": "0.4.24+commit.e67f0147.Emscripten.clang"
    },
    "version": "0.1.0",
    "networks": {}
};
//# sourceMappingURL=ApprovedRegistry.js.map