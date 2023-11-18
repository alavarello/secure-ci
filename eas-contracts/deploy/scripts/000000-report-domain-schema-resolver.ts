import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deploy, DeployedContracts, InstanceName, setDeploymentMetadata } from '../../utils/Deploy';

const func: DeployFunction = async ({ getNamedAccounts }: HardhatRuntimeEnvironment) => {
  const { deployer } = await getNamedAccounts();

  if (!process.env.EAS_ADDRESS) {
    console.error('Missing EAS_ADDRESS in .env');
    return false;
  }

  if (!process.env.SECURE_CI_REGISTRY_ADDRESS) {
    console.error('Missing SECURE_CI_REGISTRY_ADDRESS in .env');
    return false;
  }

  const deployedAddress = await deploy({
    name: InstanceName.ReportDomainSchemaResolver,
    from: deployer,
    args: [
      process.env.EAS_ADDRESS,
      process.env.SECURE_CI_REGISTRY_ADDRESS,
    ],
  });

  const ReportDomainSchemaResolver = await DeployedContracts.ReportDomainSchemaResolver.deployed();

  console.log(`ReportDomainSchemaResolver deployed ${deployedAddress} ${ReportDomainSchemaResolver}`);

  return true;
};

export default setDeploymentMetadata(__filename, func);
