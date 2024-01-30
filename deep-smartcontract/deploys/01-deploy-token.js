const hre = require("hardhat")

async function main() {
  const DEEPToken = await hre.ethers.getContractFactory("DEEPLOGO")
  const Wallet = ""
  const deploy = await DEEPToken.deploy(Wallet)

  await deploy.deployed()

  console.log("DEEPToken deployed to:", deploy.address)

  try {
    await hre.run("verify:verify", {
      address: deploy.address,
      contract: "contracts/DEEPToken.sol:DEEPLOGO",
      constructorArguments: [Wallet],
    })
  } catch (error) {
    console.log(error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
