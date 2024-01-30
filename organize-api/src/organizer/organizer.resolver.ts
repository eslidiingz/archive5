import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { OrganizerService } from "./organizer.service";
import { Organizer } from "./entities/organizer.entity";
import { CreateOrganizerInput } from "./dto/create-organizer.input";
import { UpdateOrganizerInput } from "./dto/update-organizer.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/auth.guard";
import { CurrentUser } from "src/auth/decorotor/organizer.decorator";
import { UserOrganizer } from "./entities/user.entity";
import { UserPackageOrganizer } from "./entities/user-package.entity";
import { Token } from "./entities/token.entity";
import { CreateStaffInput } from "./dto/create-staff.input";

@Resolver(() => Organizer)
export class OrganizerResolver {
  constructor(private readonly organizerService: OrganizerService) {}

  @Mutation(() => Organizer)
  registerOrganizer(
    @Args("registerOrganizerInput") createOrganizerInput: CreateOrganizerInput
  ) {
    return this.organizerService.create(createOrganizerInput);
  }

  @Mutation(() => Organizer)
  registerOrganizerStaff(
    @Args("registerOrganizerStaffInput")
    createOrganizerStaffInput: CreateStaffInput,
    @Args("admin_uid", { type: () => String }) admin_uid: string
  ) {
    return this.organizerService.createStaff(
      createOrganizerStaffInput,
      admin_uid
    );
  }

  @Query(() => [Organizer], { name: "organizers" })
  findAll() {
    return this.organizerService.findAll();
  }

  @Query(() => [Organizer], { name: "GatAllStaffByOrganizeUid" })
  findAllStaff(
    @Args("organize_uid", { type: () => String }) organize_uid: string
  ) {
    return this.organizerService.findAllStaff(organize_uid);
  }

  @Query(() => UserPackageOrganizer, { name: "organizerPackage" })
  findOrganizerPackage(@Args("uid", { type: () => String }) uid: string) {
    return this.organizerService.findOrganizerPackage(uid);
  }

  @Query(() => Organizer, { name: "organizer" })
  findOne(@Args("username", { type: () => String }) username: string) {
    return this.organizerService.findOne(username);
  }

  @Query(() => UserOrganizer, { name: "organizer" })
  @UseGuards(JwtAuthGuard)
  findOrganizer(@CurrentUser() auth: { uuid: string }) {
    return this.organizerService.findOrganizer(auth?.uuid);
  }

  @Mutation(() => Organizer)
  updateOrganizer(
    @Args("updateOrganizerInput") updateOrganizerInput: UpdateOrganizerInput
  ) {
    return this.organizerService.update(updateOrganizerInput);
  }

  @Mutation(() => Organizer)
  updateOrganizerIsActive(
    @Args("updateOrganizerInput") updateOrganizerInput: UpdateOrganizerInput
  ) {
    return this.organizerService.updateIsActive(updateOrganizerInput);
  }

  @Mutation(() => Organizer)
  updateToken(
    @Args("updateOrganizerInput") updateOrganizerInput: UpdateOrganizerInput
  ) {
    return this.organizerService.updateToken(
      updateOrganizerInput.uuid,
      updateOrganizerInput.cms_access_token
    );
  }

  @Mutation(() => Organizer)
  removeOrganizer(@Args("id", { type: () => Int }) id: number) {
    return this.organizerService.remove(id);
  }
}
