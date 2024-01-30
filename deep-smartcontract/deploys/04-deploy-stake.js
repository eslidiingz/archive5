const hre = require("hardhat")
const dayjs = require("dayjs")
const duration = require("dayjs/plugin/duration")
const {parseUnits} = require("ethers/lib/utils")

dayjs.extend(duration)

const convertTime = (amount, unit) => {
  return dayjs.duration(amount, unit).asSeconds()
}

async function main() {
  const dayRate = [
    {
      day: convertTime(5, "minutes"),
      roi: 110,
    },
    {
      day: convertTime(10, "minutes"),
      roi: 115,
    },
    {
      day: convertTime(15, "minutes"),
      roi: 120,
    },
    {
      day: convertTime(20, "minutes"),
      roi: 135,
    },
    {
      day: convertTime(30, "minutes"),
      roi: 150,
    },
  ]

  const DEEPStake = await hre.ethers.getContractFactory("DEEPStake")
  const DEEPToken = "0xE819b71a69e638dABC22ed73f27E1F9255792466"
  const deploy = await DEEPStake.deploy(DEEPToken)

  await deploy.deployed()

  console.log("DEEPStake deployed to:", deploy.address)

  for (const item of dayRate) {
    const _periodROI = await deploy.setPeriodROI(item.day, item.roi)

    await _periodROI.wait()
  }

  try {
    await hre.run("verify:verify", {
      address: deploy.address,
      contract: "contracts/DEEPStake.sol:DEEPStake",
      constructorArguments: [DEEPToken],
    })
  } catch (error) {
    console.log(error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
