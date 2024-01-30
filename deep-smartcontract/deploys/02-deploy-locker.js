const hre = require("hardhat")
const dayjs = require("dayjs")
const duration = require("dayjs/plugin/duration")

dayjs.extend(duration)

const convertTime = (amount, unit) => {
  return dayjs.duration(amount, unit).asSeconds()
}

async function main() {
  const saleType = [
    {
      name: "Seed",
      timeLock: [
        convertTime(6, "months"),
        convertTime(12, "months"),
        convertTime(24, "months"),
        convertTime(36, "months"),
        convertTime(48, "months"),
        convertTime(60, "months"),
      ],
      percentLock: [10, 10, 10, 10, 10, 50],
    },
    {
      name: "Private Sale",
      timeLock: [
        convertTime(6, "months"),
        convertTime(12, "months"),
        convertTime(24, "months"),
        convertTime(36, "months"),
        convertTime(48, "months"),
        convertTime(60, "months"),
      ],
      percentLock: [10, 10, 10, 10, 10, 50],
    },
    {
      name: "Public Sale",
      timeLock: [
        convertTime(6, "months"),
        convertTime(12, "months"),
        convertTime(24, "months"),
        convertTime(36, "months"),
        convertTime(48, "months"),
        convertTime(60, "months"),
      ],
      percentLock: [10, 10, 10, 10, 10, 50],
    },
  ]

  const DEEPLocker = await hre.ethers.getContractFactory("DEEPLocker")
  const DEEPToken = ""
  const deploy = await DEEPLocker.deploy(DEEPToken)

  await deploy.deployed()

  console.log("DEEPLocker deployed to:", deploy.address)

  for (const item of saleType) {
    const _saleType = await deploy.setSaleType(
      item.name,
      item.timeLock,
      item.percentLock
    )

    await _saleType.wait()
  }

  // try {
  //   await hre.run("verify:verify", {
  //     address: deploy.address,
  //     contract: "contracts/DEEPLocker.sol:DEEPLocker",
  //     constructorArguments: [DEEPToken],
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
