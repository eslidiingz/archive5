const {parseEther} = require("ethers/lib/utils")
const hre = require("hardhat")

async function main() {
  const TokenRate = [
    {
      rate: 3300,
      token: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", // BUSD BNB Chain
    },
  ]

  const DEEPLaunchpad = await hre.ethers.getContractFactory("DEEPLaunchpad")
  const DEEPToken = ""
  const DEEPLocker = ""
  const Wallet = ""
  const deploy = await DEEPLaunchpad.deploy(DEEPToken, DEEPLocker, Wallet)

  await deploy.deployed()

  console.log("DEEPLaunchpad deployed to:", deploy.address)

  for (const item of TokenRate) {
    const _tokenRate = await deploy.setTokenRate(item.rate, item.token)

    await _tokenRate.wait()
  }

  // try {
  //   await hre.run("verify:verify", {
  //     address: deploy.address,
  //     contract: "contracts/DEEPLaunchpad.sol:DEEPLaunchpad",
  //     constructorArguments: [DEEPToken, DEEPLocker, Wallet],
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
