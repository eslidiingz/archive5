// SPDX-License-Identifier: Multiverse Expert
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DEEPLOGO is ERC20, ERC20Burnable, AccessControl {
    constructor(address _wallet) ERC20("DEEPLOGO", "DEEP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(_wallet, 300000000 * 10**decimals());
    }
}
