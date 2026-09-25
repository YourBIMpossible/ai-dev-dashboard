# Graph Report - backend  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 21905 nodes · 52257 edges · 835 communities (637 shown, 154 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 3342 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3cd06f19`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- test_spec_generator.py
- auth_router.py
- db/models.py
- FirmAllowedHub
- aec/router.py
- _el
- test_model_policy.py
- test_cross_firm_write_denial.py
- test_circuit_helpers.py
- hash_id
- test_assistant_model_routing.py
- EntitlementCache
- test_teams_router.py
- EnforcementMode
- aps/router.py
- test_authz_share_authority.py
- hub_tenancy.py
- proxy_sdk_resource
- test_schedule_helpers.py
- test_model_budget.py
- test_slack_router.py
- test_autodesk_first_cache_tier.py
- record_decision
- get_user_uuid
- assistant.py
- cache_reconcile.py
- native_adapter.py
- assert_project_access
- test_panel_schedule.py
- autodesk_first_enabled
- Firm
- test_assistant_parameter_writes_dblane.py
- tests/conftest.py
- account_router.py
- test_budget_reservation_dblane.py
- schema_persist.py
- test_authz_acl_source.py
- test_router.py
- test_model_budget_rollup.py
- test_pdp_g1_sdk_proxy_tenancy.py
- test_seed_writer.py
- get_firm_id
- test_authz_share_optin_boundary.py
- _client
- acceptance.py
- personal_assistant.py
- NamedDeliverable
- admin_router.py
- access_cache.py
- test_emergency_deny.py
- test_authz_principals_repo.py
- revit_link/router.py
- test_relationships.py
- test_help_library.py
- get_element_group_at_tip
- Rule
- identity_router.py
- test_change_set_service.py
- WriteApproval
- test_qa_engine.py
- graph_analysis.py
- test_nl_filter_routing.py
- test_nl_filter_monitor.py
- test_slack_pairing_db.py
- test_w9b_followup.py
- get_or_refresh_category
- AecUpstreamError
- _clear_flags
- fetch_shadow_observation
- test_autodesk_first_actors.py
- RevitLinkError
- build_equipment_rows
- test_transformer_schedule.py
- test_pdp_g1_texture_binding_routes.py
- test_integrations_control_plane.py
- test_pdp_g1_sdk_proxy_core.py
- cross_firm_sharing.py
- main.py
- test_editor_recovery_dblane.py
- test_hub_isolation.py
- test_admin_router.py
- assistant_tools.py
- change_set_router.py
- derivative_proxy.py
- assistant_write_tools.py
- effective_access.py
- aec/client.py
- test_context_search.py
- _Request
- test_change_set_router.py
- admin_delegation_router.py
- assemble_architectural_sheet_list_schedule
- test_artifact_producer.py
- authz_request_scope
- test_teams_security.py
- test_identity_router.py
- UserRole
- test_enrichment_mapping.py
- test_phase1_safety.py
- RelationshipPrewarmJob
- run_agent_turn
- env_flag
- ResourceRecord
- test_firm_docs_unit.py
- test_firm_onboarding.py
- _normalize_element
- UserFirmMembership
- session.py
- test_assistant_loop.py
- _mock_db
- access.py
- test_production_readiness_preflight.py
- AsyncTTLCache
- test_view_render_mode.py
- key_service.py
- test_nl_filter_validation.py
- test_teams_pairing_db.py
- test_authz_principal.py
- test_usage_ledger_1b.py
- test_autodesk_first_workers.py
- test_circuit_schedule.py
- CredentialSelection
- admin_auth.py
- test_ai_context_policy.py
- track2_content_router.py
- test_membership_lifecycle_cascade.py
- scheduler.py
- support_explain.py
- test_firm_docs_cka_authz_dblane.py
- test_assistant_live_read.py
- test_model_policy_router.py
- compute_alerts
- artifacts_router.py
- test_log_redaction.py
- test_client_ip.py
- test_model_resolve.py
- _el
- test_chat_gate_cache_only_dblane.py
- guard_derived_read
- slack/router.py
- test_prewarm_worker.py
- QaAnalysisRun
- spec_generator.py
- test_artifacts_router.py
- test_authz_share_owner_liveness.py
- proxy_router.py
- cross_model_join.py
- test_project_enrollment.py
- service.py
- check_firm_view_editor
- test_aps_read_token_refresh_leak.py
- RedisStore
- test_aps_cache.py
- ApsWriteError
- assistant_schemas.py
- test_categories_cache.py
- test_w9b_review_fixes.py
- test_assistant_tools.py
- test_enrollment_endpoints.py
- teams/router.py
- teams/pairing.py
- FakeProvisioningClient
- ClientBudget
- assistant_live_read.py
- test_admin_delegation_router.py
- test_circuits.py
- test_domain_names.py
- UpstreamResponse
- migrate.py
- TestClient
- test_consent.py
- serving.py
- test_track2_content_authz.py
- test_coordination_report.py
- test_filter_eval.py
- effective_project_access
- test_param_aliases.py
- test_qa_router.py
- test_autodesk_first_read_paths.py
- test_synthetic_seed_optin_guard.py
- test_identity_link_flow.py
- test_classification_enrichment.py
- test_cross_model_join_doors.py
- sanitize_filename
- test_cold_load_perf.py
- test_qa_ids_import.py
- sdk_proxy.py
- production_readiness.py
- test_aps_hub_isolation.py
- test_track2_content_router.py
- test_geometry_fetch.py
- model_discovery.py
- nl_filter_harness.py
- test_assistant_conversations_endpoint.py
- test_pane_pairing_endpoints.py
- test_pdp_containment.py
- test_seed_planner.py
- test_effective_access.py
- share_authority.py
- digest.py
- onboarding_router.py
- firm_onboarding.py
- test_issues_join_probe.py
- membership.py
- test_sync_token.py
- test_assistant_resume.py
- test_acc_role_sync.py
- test_ai_context_policy_router.py
- test_conversation_store.py
- test_level_host_pattern_unit.py
- qa/router.py
- test_authz_enforce_keystone.py
- test_boot_shared_state_guard.py
- test_pane_pairing.py
- test_last_editor_lifecycle_paths_dblane.py
- build_request
- nl_filter.py
- _Ctx
- usage_logger.py
- firm_docs_router.py
- test_preflight_user_roles.py
- test_spatial_relationships.py
- bench_derivative_proxy.py
- test_auth_login_state.py
- test_derivative_proxy_gate.py
- test_lock_order_dblane.py
- test_w7_redaction.py
- test_audit_remediation_p4.py
- test_qa_history_capture_purge.py
- test_type_grain_rollup.py
- test_cloud_ids.py
- encrypt_blob
- _create
- revit_link/audit.py
- nl_filter_monitor.py
- test_change_set_mutation_hardening.py
- test_a_grant_blocked_on_the_purges_firm_lock_fails_once_the_purge_commits
- test_cross_model_join.py
- test_health_shared_state_readiness.py
- build_native_circuit_rows
- UsageEvent
- if_none_match_matches
- run_matrix.py
- test_teams_crypto.py
- test_relay_boundary.py
- test_w9_lane_f_regressions.py
- test_wave7_automation.py
- test_db_safety.py
- client_keys.py
- ManifestCache
- test_membership_gate.py
- RevitLinkErrorCode
- test_change_set_router_type_target.py
- test_login_firm_autolink.py
- build_plan
- test_qa_overrides.py
- test_structural_framing_schedule.py
- test_live_filter.py
- test_sim_artifacts_autodesk_first.py
- test_assistant_limits.py
- DataClassification
- _match_props
- _rows
- _FakeSession
- resolve_posture
- test_architectural_window_schedule.py
- test_stale_sweep_worker.py
- test_geometry_decode.py
- claim_next
- test_firm_docs_routes_dblane.py
- router
- _stub_live_read
- test_pdp_g1_proxy_router.py
- test_usage_logger.py
- test_acc_roles_router.py
- test_assistant_thinking.py
- test_authz_health_query.py
- test_identity_link_login.py
- track2_content_repo.py
- verify_project_item_pairing
- resolve_project_rules
- test_spec_render.py
- _prod_posture
- sync_token.py
- MemoryStore
- fixture
- revoke_project_share_grants
- live_filter.py
- derivative_cache.py
- FastAPI
- test_native_adapter_aec9.py
- test_auth_identity_exemptions.py
- test_cross_firm_share_api.py
- test_usage_ledger_dblane.py
- test_xlsx_export.py
- test_assistant_context.py
- record_badge_use
- test_service_badge.py
- test_key_permissions.py
- test_membership_draft_gating.py
- test_model_index_discovery.py
- test_elements_etag.py
- test_entrypoint_firm_docs.py
- test_change_set_list_and_discard.py
- test_personal_assistant_endpoint.py
- test_qa_migrations_idempotent.py
- _FakeAdminResponse
- test_artifacts_provenance.py
- test_authz_reconcile.py
- compute_cost
- help_library.py
- test_lighting_fixture_schedule.py
- param_aliases.py
- ProjectConfig
- manifest.template.json
- TestRelayFrameGuard
- test_autodesk_first_d1b_revert_gate.py
- parametrize
- test_get_user_token_refresh.py
- test_nl_filter_ai_context_policy.py
- ProjectAiContextPolicy
- test_pairing_block_metric.py
- run_model_health
- build_structural_column_rows
- _login
- test_help_wave4_discoverability.py
- TestMigrationFile
- build_architectural_door_rows
- test_architectural_room_finish_schedule.py
- test_ops_metrics.py
- build_purge_report
- build_mechanical_equipment_rows
- test_nav_handle.py
- build_structural_foundation_rows
- is_suppressed_element
- _Session
- test_change_set_separate_approver_flag.py
- test_editor_recovery_cli.py
- test_groups_views_hub_isolation.py
- seed_world
- test_teams_pairing_store.py
- ai_context_policy_router.py
- build_architectural_wall_type_rows
- get_current_sid
- discipline_field_probe.py
- identity.py
- test_help_corpus_guard.py
- rollout_diagnostics.py
- has_spec_library
- test_cfgb_posture_and_aps_boot.py
- test_2legged_token.py
- _StubDb
- TestNamedDeliverableOrmExposure
- test_pairing_gate.py
- test_pdp_g1_proxy_tenancy.py
- GateTests
- test_interiors_furniture_schedule.py
- build_plumbing_fixture_rows
- test_schedule_endpoints_preparing.py
- favorites_router.py
- test_gql_client.py
- test_shared_parameters_registry.py
- test_reclaim.py
- EditLog
- fetch_ops_metrics
- test_explore_allowlist.py
- test_security_batch_b.py
- build_fire_protection_sprinkler_rows
- build_mechanical_air_terminal_rows
- test_revit_context_injection.py
- Registry
- test_admin_router_audit_edits.py
- test_authz_telemetry.py
- test_change_set_separate_approver_d2.py
- test_grant_refused_on_inactive_firm.py
- test_wizard_consent_identity.py
- assistant_context.py
- emergency_deny_router.py
- classify_discipline
- build_ict_communication_device_rows
- _FakeProvClient
- test_logging_config.py
- verify_request
- test_authz_lifecycle_router.py
- _url
- _xs
- test_filter_observations.py
- test_property_map_cache.py
- test_artifacts_authz.py
- artifacts_repo.py
- test_qa_coordination_report_router.py
- _check_separate_approver
- da4r_tokens.py
- warn_if_multi_firm_single_relay
- teams/client.py
- test_assistant_endpoint.py
- _flag
- test_change_set_hub_isolation.py
- test_phase5_persistence.py
- test_refresh_lock_per_sid.py
- extract_text
- test_model_boot_guard.py
- revit_context.py
- _route_handlers
- test_firm_literal_gate_gap.py
- test_wire_contract_vectors.py
- probe_origin_anomaly.py
- generate.py
- test_aps_discovery_tombstone.py
- _stub_phase6
- test_assistant_models_membership_gate.py
- test_autodesk_first_aps_share.py
- test_autodesk_first_unit.py
- _models
- test_firm_docs_upload_gaps_dblane.py
- sync_project_roles
- probe
- test_discipline_field_probe.py
- load_firm_policy
- build_ict_av_rows
- format_health_csv
- _upsert_model_index
- spatial_relationships.py
- TestRevertParameterChange
- test_redis_store_ping_probe.py
- SharedStore
- _PolicyStore
- test_aps_auth_gate.py
- _as_user
- test_firm_docs_policy_unit.py
- test_relationships_durable.py
- test_session_store_redis.py
- build_system_blocks
- acquire_or_wait
- load_lock
- test_change_set_review_transitions.py
- test_favorites.py
- test_groups_403_ordering.py
- test_pane_pairing_index.py
- test_panel_schedule_preparing.py
- _Store
- test_request_context.py
- test_rollout_diagnostics.py
- TestRevertLegacyProjectBinding
- test_audit_quickwins.py
- ChangeSet
- _build_fastapi_stub
- circuit_readability_harness.py
- test_nl_filter_eval_contract.py
- test_relay_error_map.py
- _client
- test_assistant_navigation_resolve.py
- _reset_caches
- fixture
- _clean_rows
- test_multiworker_sim.py
- test_pane_session_visibility.py
- test_relationships_singleflight.py
- test_search_hub_isolation.py
- fixture
- test_viewer_token.py
- build_mechanical_damper_rows
- async_cache.py
- .get_or_compute
- store.py
- test_circuit_readability_eval.py
- test_aec_token_refresh_classification.py
- ht
- test_personal_workspace_migration_downgrade.py
- test_search_preparing.py
- _lf
- test_switchboard_distribution_endpoint.py
- test_transformer_endpoint.py
- test_version_check_worker.py
- enqueue
- resolved_backend
- _build
- test_aps_dead_lineage.py
- test_authz_child_filtering.py
- fixture
- wiring
- test_circuit_endpoint.py
- test_lighting_fixture_endpoint.py
- test_electrical_equipment_endpoint.py
- test_guard_emergency_deny.py
- test_issues_probe_route.py
- test_nl_filter_contract_boundary.py
- test_schedule_pool_coverage.py
- test_version_check_worker_authfail.py
- assistant_write_reclaim_worker.py
- tool_check_model_health
- _FakeSession
- model_picker.py
- model_resolve.py
- backfill_authz_projection.py
- test_assistant_authz_gate.py
- test_assistant_error_sanitized.py
- test_auth_status_resilience.py
- test_conftest_router_skip_detector.py
- test_probe_origin_anomaly.py
- test_receptacle_endpoint.py
- test_relationships_memory.py
- is_firm_model_editor_open
- run_topology_checks
- generate_xlsx
- world
- _run
- test_data_routes_require_hub_id.py
- test_groups_views_personal_samefirm_existence_oracle.py
- test_hub_id_query_min_length.py
- test_migration_firm_doc_capability_live_unique.py
- test_provider_tool_use_is_refused_closed
- _chat
- test_tip_cache.py
- aadf3ce41b1c_user_roles_firm_scoped_pk.py
- c7d8e9f0a1b2_add_personal_workspace.py
- _give_hub
- test_element_counts_endpoint.py
- _ScriptedQuery
- _FakeDB
- test_synthetic_load_host_guard_pure.py
- _icons
- acc_roles_router.py
- preview_current_parameter_value
- health.py
- distance_to_footprint
- generate
- revit_link/conftest.py
- TestLifecycleToken
- _TokenExchange
- test_failed_compute_does_not_leak_its_lock
- test_authz_audit_firmid_normalization.py
- _PredicateQuery
- test_backfill_apply_guard.py
- test_smoke_boot.py
- _views_wiring
- UploadFileSourceContainmentTests
- BuildingTypesTests
- _member
- c4e7a2b91d38_staged_change_family_type_target.py
- test_aec_module_identity.py
- test_assistant_query_edit_log.py
- _FakeQuery
- _decide
- test_migration_aec_schema_cache.py
- test_sec2_auth_ordering.py
- test_security_batch_a.py
- test_security_c1_sessions.py
- test_view_only_doc_contract.py
- _NetworkFailThenDeleteFailsClient
- 3aa734cda334_model_routing_usage_ledger.py
- s9t0u1v2w3x4_add_cache_reconcile_state.py
- w3x4y5z6a7b8_fav_firm_key_and_enroll_index.py
- scratch
- test_generated_artifacts_are_in_sync
- TestSsaExchange
- test_auth_logout_csrf.py
- _FakeQuery
- test_no_production_caller_declares_required
- test_item_tip_without_data_id_is_never_cached_503_on_body_unchanged_off
- test_revert_on_entitlement_runs_before_any_gate_session_is_open
- _body
- _body
- _Autodesk
- _stub_warm_pool
- _Boom
- test_federated_models.py
- _fake_token
- _FakeDcache
- _category_harness
- _load
- _pf
- b7c8d9e0f1a2_cka_document_scope_classification.py
- f5a6b7c8d9e0_add_phase3_10a_room_join_geometry_cache.py
- l2m3n4o5p6q7_add_canonical_principals.py
- test_auth_roles_alias.py
- _body
- test_cross_firm_share_detail_strings_frontend_pin.py
- test_env_example_documents_backend_env_names.py
- test_gunicorn_launch_config.py
- test_definitive_tip_404_deletes_the_binding
- test_perp_audit_plat7_plat10.py
- test_resolve_personal_credential_reads_only_user_api_keys
- test_redis_degraded_mode.py
- point_in_footprint
- 1f7f44253c51_add_bimpossible_role_to_memberships.py
- 80af6ebc3df5_firm_scope_ai_context_policy.py
- 9329a1e7be85_add_slack_gateway_bindings.py
- 9c9a59a39d64_staged_change_typed_values.py
- a4c123b1612d_add_firm_model_policy.py
- a7c1e93f4b28_add_teams_gateway_bindings.py
- b24de6f81c35_edit_log_change_set_linkage.py
- c7d2e9f4a1b6_drop_firm_aps_hub_id.py
- d2e3f4a5b6c7_add_model_index_deleted_at.py
- d5f8b3c41e27_revit_link_request_log_firm_id.py
- e5f6a7b8c9d1_firm_doc_capability_live_unique.py
- j0k1l2m3n4o5_add_hub_access_scope_and_firm_allowed_projects.py
- n4o5p6q7r8s9_add_artifact_drafts_and_provenance.py
- q7r8s9t0u1v2_add_authz_decision_actor_type.py
- r8s9t0u1v2w3_add_identity_link_states.py
- z8a9b0c1d2e3_rename_assistant_digests_created_at.py
- test_auth_httpx_timeouts.py
- shares
- _FakeDb
- test_logout_csrf.py
- test_redis_cutover_doc_targeted_recreate.py
- caller_rows
- EditLogOutcome
- 13014695175a_user_api_keys_and_account_audit_log.py
- 1f617e094d19_add_project_share_grants.py
- 945401a1e8c0_baseline_phase35.py
- a13cd5e70f24_change_set_applied_audit_fields.py
- a5b6c7d8e9f0_constrain_integration_registration_status.py
- a9b8c7d6e5f4_add_assistant_parameter_proposals.py
- b0c1d2e3f4a5_add_element_cache_origin_absent.py
- b1c2d3e4f5a6_move_is_draft_to_membership.py
- b5d234c2723e_add_firm_billing_timezone.py
- c1d2e3f4a5b6_add_writeback_and_wizard_audit_tables.py
- c4d5e6f7a8b9_add_execution_started_at.py
- c6d7e8f9a0b1_add_firm_onboarding_requests.py
- d1b7e2a9c4f0_add_assistant_parameter_proposals_project_id.py
- d5e6f7a8b9c0_add_model_versions_cached_at_index.py
- d5f8b3c62e49_change_set_approval_reason.py
- d8e9f0a1b2c3_add_client_budget_reservations.py
- e0f1a2b3c4d5_add_firm_allowed_hubs_and_project_hub_cache.py
- e3f4a5b6c7d8_add_qa_history_tables.py
- e6f7a8b9c0d1_add_phase3_8_acc_role_sync.py
- f13c5e70a0b1_add_change_set_tables.py
- f2b3c4d5e6f7_add_allowed_projects.py
- f4a5b6c7d8e9_add_integration_registration.py
- f7a8b9c0d1e2_add_is_firm_model_editor.py
- h8i9j0k1l2m3_add_firm_documents.py
- i9j0k1l2m3n4_add_share_snapshots.py
- j0k1permproj_add_permission_projection.py
- k1l2m3n4o5p6_add_authz_decision_log.py
- m3n4o5p6q7r8_add_published_artifacts.py
- o5p6q7r8s9t0_add_track2_content_grants.py
- p6q7r8s9t0u1_add_emergency_deny_scopes.py
- s1t2u3v4w5x6_add_phase5_persistence.py
- t0u1v2w3x4y5_drop_allowed_projects.py
- t2u3v4w5x6y7_add_provisioning_jobs.py
- u1v2w3x4y5z6_add_r5_filter_observations.py
- w5x6y7z8a9b0_add_assistant_conversations.py
- x6y7z8a9b0c1_add_assistant_digests.py
- write_spf_text
- ChannelBinding
- test_policy_vocabulary_is_identical_in_code_model_and_migration
- test_reserve_turn_refuses_finalized_replay
- test_revert_on_execute_role_gate_is_the_spines_audited_one_and_runs_once
- test_revert_on_preview_legacy_null_row_is_allowed_when_the_gate_passes
- test_firm_router_never_touches_personal_key_accessor
- test_refresh_model.py
- _admin_project_id
- RefusalNotice
- .check_sync_conflicts
- .list_open_documents
- .read_category
- prepare-firm-docs.sh
- _real_httpx
- test_live_read_resume_reservation_429_restores_ticket_before_body_read
- test_assistant_readonly.py
- test_revert_on_role_gate_precedes_the_project_gate
- test_transient_upstream_failure_is_503_not_a_denial
- test_ledger_executor_is_fifo
- authz/__init__.py
- firm_docs/__init__.py
- entrypoint.sh
- repair-firm-docs-ownership.sh
- shared_parameters/__init__.py
- sim/__init__.py
- test_revert_on_preview_write_flag_off_precedes_the_project_gate
- test_revert_on_preview_is_bound_to_the_proposals_project
- test_revert_on_execute_empty_stamp_is_fail_closed
- test_revert_off_legacy_null_row_is_unchanged
- test_revert_off_never_binds
- test_urn_binding_on_covers_version_and_derivative_forms
- test_usage_predicate_is_owner_personal_byok_only
- AccessLevel
- Firm
- Request
- WriteInstanceParameterRequest
- WriteInstanceParameterResponse
- BudgetStatus
- CredentialSelection
- Request
- RequestKind
- SavedView
- AccessLevel
- timedelta
- DataClassification
- DataClassification
- Session
- MultiFernet
- Point2D
- TypedDict
- NamedDeliverable
- UserFirmMembership
- NamedTuple
- Session
- LookupError
- Request
- post
- SavedView
- Session
- Any
- Response
- Request
- Response
- Response
- AsyncClient
- Request
- Authorizer
- BackgroundTasks
- BaseException
- CompletedProcess
- DataClassification
- Decision
- EditLog
- Event
- Exception
- field_validator
- FirmAllowedHub
- JSONResponse
- Lock
- Request
- ModelUrnResolver
- Namespace
- ProjectShareGrant
- ProvisioningJob
- ProxyResult
- PublishedArtifactView
- put
- RedirectResponse
- RelationshipPrewarmJob
- ResourceRecord
- Response
- CheckSyncConflictsRequest
- CheckSyncConflictsResponse
- ListOpenDocumentsRequest
- ListOpenDocumentsResponse
- ReadCategoryRequest
- ReadCategoryResponse
- SyncWithCentralRequest
- SyncWithCentralResponse
- WriteInstanceParameterRequest
- WriteInstanceParameterResponse
- SdkResource
- Session
- Request
- SourceAuthorizer
- str
- Request
- NamedDeliverable
- CredentialSelection
- real_hub_tenancy
- parametrize
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- real_hub_tenancy
- Path
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- fixture
- UpstreamResponse
- ProjectSetupInput
- Request

## God Nodes (most connected - your core abstractions)
1. `Firm` - 273 edges
2. `generate_spec_draft()` - 255 edges
3. `UserFirmMembership` - 236 edges
4. `_el()` - 165 edges
5. `ModelIndex` - 160 edges
6. `_ids()` - 160 edges
7. `FirmAllowedHub` - 145 edges
8. `AccountAuditLog` - 142 edges
9. `get_user_uuid()` - 141 edges
10. `hash_id()` - 127 edges

## Surprising Connections (you probably didn't know these)
- `test_list_keeps_rows_when_firm_capability_enabled()` --uses--> `FirmAllowedHub`  [INFERRED]
  tests/test_change_set_hub_isolation.py → db/models.py
- `test_plan_persists_planning_job_and_returns_plan()` --uses--> `ProvisioningJob`  [INFERRED]
  tests/wizard/test_router.py → db/models.py
- `test_store_follows_the_selector()` --uses--> `SharedStateConfigError`  [INFERRED]
  tests/test_production_readiness_preflight.py → shared_state/config.py
- `test_upload_rules()` --uses--> `AccessLevel`  [INFERRED]
  tests/test_firm_docs_policy_unit.py → aec/authz/effective_access.py
- `test_normalize_element_prefers_external_id_then_falls_back_to_id()` --calls--> `_normalize_element()`  [INFERRED]
  tests/test_audit_quickwins.py → aec/normalize.py

## Import Cycles
- None detected.

## Communities (835 total, 154 thin omitted)

### Community 0 - "test_spec_generator.py"
Cohesion: 0.03
Nodes (233): generate_spec_draft(), Build a spec-section draft for a category from its element rows. Returns a…, Return the CSI section number for a Revit category, or None. Uses Wave 4.9's…, section_for_category(), _el(), _ids(), Wave 4.10 — Spec Draft Generation: rule-engine unit tests., test_access_control_card_reader_clause() (+225 more)

### Community 1 - "auth_router.py"
Cohesion: 0.02
Nodes (167): on_session_cleared(), Logout / dead-session hook for ``aps.auth.clear_user_session``: drops every…, all_sessions(), aps_setting(), ApsConfigMissing, _basic_header(), clear_user_session(), create_user_session() (+159 more)

### Community 2 - "db/models.py"
Cohesion: 0.03
Nodes (147): add_cli_actor_arguments(), ArgumentParser, Add ``--actor`` and ``--reason``. Both are optional, so flag-OFF invocations…, assemble_and_resolve(), invalidate_room_pool(), _load_room_pool(), Drop cached room pools for a project. Called by the warm writer after it…, Assemble (rooms, level_elevation_by_name, current_phase) from the arch models'… (+139 more)

### Community 3 - "FirmAllowedHub"
Cohesion: 0.03
Nodes (126): Every deployment's firm_id before P3-8-DYN, and the fallback since., _static_firm_id(), FirmAllowedHub, FirmAllowedProject, ProjectHubCache, APS hubs a firm may reach — the single source of truth for hub tenancy. Plural…, Per-firm project enrollment — the client-selected project gate (Client-Mgmt E,…, APS project id → hub id, as verified against APS Data Management. Hub… (+118 more)

### Community 4 - "aec/router.py"
Cohesion: 0.04
Nodes (156): Flag on: an optional ``project_id`` is mandatory (400), because the entitlement…, require_project_id(), _apply_columns(), _apply_filters(), _assert_hub_matches_cache(), _authz_env_enforcing(), _authz_gate_model_read(), _authz_gate_optional_resource_read() (+148 more)

### Community 5 - "_el"
Cohesion: 0.03
Nodes (54): assemble_architectural_floor_assembly_schedule(), build_architectural_floor_assembly_rows(), Type-grain floor assembly schedule. One row per floor type with total area (sum…, _phase_va(), Per-phase apparent power, unit-tolerant. None when absent/blank so the caller…, assemble_fire_protection_alarm_device_schedule(), build_fire_protection_alarm_device_rows(), Type-grain fire alarm device schedule from Fire Alarm Devices category. One row… (+46 more)

### Community 6 - "test_model_policy.py"
Cohesion: 0.03
Nodes (139): classify_provider_error(), denial_counts(), is_model_unavailable_error(), load_settings(), ModelDenied, ModelResolution, pick_credential(), ProviderFailure (+131 more)

### Community 7 - "test_cross_firm_write_denial.py"
Cohesion: 0.03
Nodes (140): AccessLevel, Decision, The cross-firm-share verdict for a read the projection has no row for, or…, share_decision(), real_hub_tenancy, _active_share_rows(), _crawl(), _crawl_index() (+132 more)

### Community 8 - "test_circuit_helpers.py"
Cohesion: 0.03
Nodes (137): _circuit_breaker_amps(), _circuit_first_int(), _circuit_load_va(), _circuit_poles(), _circuit_sort_key(), _device_description(), _float_from(), _format_apparent_power_va() (+129 more)

### Community 9 - "hash_id"
Cohesion: 0.03
Nodes (119): True when background cache-fill workers use the Service-Account identity…, service_prewarm_active(), DecisionEvent, histogram_from_snapshot(), note_redis_unavailable(), _percentile(), Any, Autodesk-first decision telemetry (W7.1a): one structured event per… (+111 more)

### Community 10 - "test_assistant_model_routing.py"
Cohesion: 0.04
Nodes (118): _AlwaysRaisingMessages, _Block, _budget(), _clear_pending(), _client(), _downgradable(), _drain_async(), _events() (+110 more)

### Community 11 - "EntitlementCache"
Cohesion: 0.04
Nodes (100): Entitlement, entitlement_key(), EntitlementCache, get_default_cache(), on_aps_refusal(), on_session_removed(), Layer 1 — per-user Autodesk project entitlement snapshot cache (Option B, PR…, Build the key from a live token; the token itself is hashed here and discarded. (+92 more)

### Community 12 - "test_teams_router.py"
Cohesion: 0.04
Nodes (101): The conversation's binding (project + model), or None if unbound. Returns plain…, resolve_conversation_binding(), resolve_tenant(), _activity(), _allow_project(), _async_none(), _deny_hub_factory(), _hub_allows() (+93 more)

### Community 13 - "EnforcementMode"
Cohesion: 0.03
Nodes (114): EnforcementMode, How a derived-read decision is applied at a serving path. OFF — the gate is…, _call(), _FakeDb, _Grant, _IndexedHubQuery, Pure tests for the derived-read orchestrator (aec.authz.guard). Pure lane (no…, OFF is a zero-cost no-op and stays one: the telemetry must not give it a reason… (+106 more)

### Community 14 - "aps/router.py"
Cohesion: 0.03
Nodes (120): content_scope_cacheable(), May a content-cache key built from ``scope`` be STORED? (W5 P1F4 item 1) False…, current_user_scope(), Resolve the caller's Autodesk identity and a live token, or 401. Fails closed:…, Name-sorted APS project listing of one of the user's hubs, cached per (user,…, user_hub_projects(), {discipline_label: [{name,id}, ...]} for the project's RVTs, grouped by the…, suggest_pilots() (+112 more)

### Community 15 - "test_authz_share_authority.py"
Cohesion: 0.03
Nodes (110): _DB, _decide(), _DirtyDB, _HubCacheRow, _HubGrantRow, _own_reach_rows(), _PendingRollback, parametrize (+102 more)

### Community 16 - "hub_tenancy.py"
Cohesion: 0.03
Nodes (109): Listed FIRST in each route's dependencies: flag before auth, so an OFF surface…, _sharing_or_404(), sharing_enabled(), assert_project_in_firm_hub(), assert_project_in_firm_hub_cached(), _audit_hub(), _audit_refused_write(), _autodesk_first_read_ceiling() (+101 more)

### Community 17 - "proxy_sdk_resource"
Cohesion: 0.05
Nodes (110): proxy_sdk_resource(), ModelUrnResolver, Authorize -> resolve model -> bind resource -> fetch. Fail closed at every step…, ProjectModelLister, _b_manifest_fetches(), _cdn_url(), _concurrent_world(), _manifest() (+102 more)

### Community 18 - "test_schedule_helpers.py"
Cohesion: 0.04
Nodes (105): _furniture_level_summaries(), Interiors Furniture schedule shaping (Wave 16). Pure-Python — no…, Furniture count per Level (unleveled furniture bucketed under '(no level)')., _air_terminal_system_summaries(), Terminal count + total airflow (CFM) per System. Per-type airflow (cfm) is…, _plumbing_fixture_system_summaries(), Fixture count + total water fixture units (WFU) per System. Per-type WFU is…, _pipe_system_summaries() (+97 more)

### Community 19 - "test_model_budget.py"
Cohesion: 0.04
Nodes (107): Actor, allowed_model_ids(), budget_downgrade_notice(), budget_downgrade_target(), Candidate, _default_candidate(), FirmPolicy, _gate() (+99 more)

### Community 20 - "test_slack_router.py"
Cohesion: 0.04
Nodes (93): One (workspace, channel) -> one BIMpossible project AND one model. Not in the…, SlackChannelBinding, The channel's binding (project + model), or None if unbound. Returns plain…, resolve_channel_binding(), _allow_project(), _async_none(), cleanup(), client() (+85 more)

### Community 21 - "test_autodesk_first_cache_tier.py"
Cohesion: 0.05
Nodes (93): discovery_cache(), entitlement_cache(), invalidate_user_access(), invalidate_user_discovery(), _log_invalidation(), Redis iff the canonical shared-state selector resolves to ``redis`` (W5 CFG-B).…, Drop every entitlement AND discovery entry of one user (all tokens). ``cache``…, Drop one user's hub / hub-project listings (all tokens); entitlements stay. (+85 more)

### Community 22 - "record_decision"
Cohesion: 0.04
Nodes (90): disable_batching(), dropped_count(), enable_batching(), _enqueue(), flush_pending(), _flush_row_by_row(), pending_count(), Any (+82 more)

### Community 23 - "get_user_uuid"
Cohesion: 0.04
Nodes (90): get_user_uuid(), Returns a stable UUID for an Autodesk user ID string., actions(), as_user(), audit_rows(), build_app(), client(), domain_login() (+82 more)

### Community 24 - "assistant.py"
Cohesion: 0.04
Nodes (104): _assert_firm_capability_for_hub(), assistant_models(), _authz_gate_model(), _autodesk_first_revert_gate(), _build_client(), chat(), ChatContext, ChatMessage (+96 more)

### Community 25 - "cache_reconcile.py"
Cohesion: 0.04
Nodes (93): _apply_transition(), build_delete_plan(), _distinct_cached_projects(), _est_element_bytes(), _fail_threshold(), _flag(), format_report(), _get_or_make_state() (+85 more)

### Community 26 - "native_adapter.py"
Cohesion: 0.06
Nodes (66): NotImplementedError, CheckedOutItem, CheckSyncConflictsRequest, CheckSyncConflictsResponse, DocumentInfo, ElementRow, ErrorResponse, ListOpenDocumentsRequest (+58 more)

### Community 27 - "assert_project_access"
Cohesion: 0.06
Nodes (93): assert_project_access(), The authoritative, fail-closed project-access decision (one function, every…, _allows(), _audit_db_error(), _audit_rows(), _denies(), flag_off(), flag_on() (+85 more)

### Community 28 - "test_panel_schedule.py"
Cohesion: 0.04
Nodes (96): assemble_panel_schedule(), build_circuits(), _compose_vpw(), compute_totals(), extract_load_type_breakdown(), extract_panel_header(), _format_voltage_v(), _pad_spare_slots() (+88 more)

### Community 29 - "autodesk_first_enabled"
Cohesion: 0.04
Nodes (90): _grantee_not_proven(), True iff the Autodesk-first flag is on and ``principal_id`` has no Layer-1…, _aps_base(), _cached(), _emit(), _probe(), _authed_get(), autodesk_first_enabled() (+82 more)

### Community 30 - "Firm"
Cohesion: 0.04
Nodes (90): AccountAuditLog, Firm, FirmAlertDismissal, FirmDomain, Principal, Append-only audit trail for credential and role changes (B-3, migration…, One canonical BIMpossible principal per human (plan §1). External identities…, Barrier (+82 more)

### Community 31 - "test_assistant_parameter_writes_dblane.py"
Cohesion: 0.04
Nodes (89): amend_proposal(), assistant_revit_write_enabled(), AssistantWriteAuditEvent, _emit(), ErrorClass, execute_proposal(), ExecutionOutcome, _handle_execution_error() (+81 more)

### Community 32 - "tests/conftest.py"
Cohesion: 0.04
Nodes (77): hookimpl, cleanup(), db(), _ensure_worker_database(), _hub_tenancy_default_allow(), make_leaf(), _factory(), _make_leaf_view() (+69 more)

### Community 33 - "account_router.py"
Cohesion: 0.06
Nodes (89): account_add_hub(), account_api_key(), account_available_projects(), _compute(), account_budget(), account_create_project_share(), account_discover_hubs(), account_enroll_project() (+81 more)

### Community 34 - "test_budget_reservation_dblane.py"
Cohesion: 0.06
Nodes (84): expire_stale(), _expire_stale_locked(), extend(), _finalize(), finalize_in_background(), _now(), datetime, Exception (+76 more)

### Community 35 - "schema_persist.py"
Cohesion: 0.04
Nodes (81): GA-H2 (2026-06-09 audit) — delete superseded ModelVersion rows for one model.…, sweep_superseded_versions(), get_property_map(), _best_effort_write(), invalidate(), invalidate_prefix(), key_property_map(), key_relationships() (+73 more)

### Community 36 - "test_authz_acl_source.py"
Cohesion: 0.05
Nodes (72): AclSource, AclSourceNotValidated, ApsAclSource, authz_seed_enabled(), _HttpGetJson, HubNotAllowedForFirm, normalize_snapshot(), parse_folder_contents() (+64 more)

### Community 37 - "test_router.py"
Cohesion: 0.04
Nodes (66): _clear_firm_hub_grants(), client(), _consent_env(), _grant_firm_hub(), _make_planning_job(), _patch_number_check_upstream(), fixture, parametrize (+58 more)

### Community 38 - "test_model_budget_rollup.py"
Cohesion: 0.05
Nodes (68): firm_billing_context(), load_budget(), load_budget_or_degraded(), platform_spend(), datetime, Decimal, UUID, Platform budget accounting — slice 3, DB layer. Rolls the slice-1B… (+60 more)

### Community 39 - "test_pdp_g1_sdk_proxy_tenancy.py"
Cohesion: 0.06
Nodes (72): _AnyBytesUpstream, aps_bytes(), _asgi_get(), _assert_denied(), _assert_download_denied(), _assert_private_no_store(), _base(), _bearer() (+64 more)

### Community 40 - "test_seed_writer.py"
Cohesion: 0.06
Nodes (72): apply_backfill(), BackfillApplyResult, MemberFact, plan_membership_backfill(), ProjectResources, Any, datetime, timedelta (+64 more)

### Community 41 - "get_firm_id"
Cohesion: 0.05
Nodes (70): 403 unless the claimed hub is in the user's own Autodesk hub list., require_user_hub(), allowed_hubs_for(), Hub ids this firm may reach, from firm_allowed_hubs (empty = none)., get_firm_id(), is_multi_tenant_deployment(), Returns the firm UUID for the current request. Resolution order (see module…, True once more than one distinct firm is registered (the SEC-MEMBERSHIP-1… (+62 more)

### Community 42 - "test_authz_share_optin_boundary.py"
Cohesion: 0.04
Nodes (68): check(), assert_projection_authority(), Tripwire: this outcome must NOT have come from the cross-firm share authority.…, _backend_source(), _callers_of(), _enclosing_def(), _enclosing_function(), _gate_calls() (+60 more)

### Community 43 - "_client"
Cohesion: 0.05
Nodes (34): _client(), CreateFolderTests, handler(), handler(), handler(), CreateProjectTests, handler(), handler() (+26 more)

### Community 44 - "acceptance.py"
Cohesion: 0.05
Nodes (66): Evidence, Grade, grade_fault_closed(), grade_logscan_hits(), grade_not_graded_designed_mix(), grade_redis_steps(), grade_revoke_seconds(), grade_rollback_step() (+58 more)

### Community 45 - "personal_assistant.py"
Cohesion: 0.06
Nodes (72): refusal_notice(), personal_keys_enabled(), Slice 4: the user's OWN key for the isolated personal workspace. Reads ONLY…, Whether the personal-key tier is offered at all (B-2; ratified D-3 gives admins…, resolve_personal_credential(), safe_refusal_category(), _audit(), _context_response() (+64 more)

### Community 46 - "NamedDeliverable"
Cohesion: 0.05
Nodes (72): _clear_firm_default_group(), create_group(), delete_group(), _get_active_group(), _group_defaults_jsonb(), _group_to_dict(), GroupCreateBody, GroupMember (+64 more)

### Community 47 - "admin_router.py"
Cohesion: 0.08
Nodes (75): add_domain(), AddDomainBody, admin_create_project_share(), admin_grant_hub(), admin_list_hubs(), admin_list_integrations(), admin_list_project_shares(), admin_patch_hub() (+67 more)

### Community 48 - "access_cache.py"
Cohesion: 0.06
Nodes (44): alookup(), aon_aps_refusal(), arecord(), _BreakerOpen, content_generation_token(), discovery_generation_key(), discovery_ttl_seconds(), entitlement_redis_key() (+36 more)

### Community 49 - "test_emergency_deny.py"
Cohesion: 0.06
Nodes (65): EmergencyDenial, is_active(), match_emergency_denial(), _norm(), datetime, Break-glass emergency deny — the manual "Revoke access now" kill switch (plan…, A pure, immutable view of one stored emergency-deny row.…, Normalize an identity to a comparable string (UUIDs, ints, etc. all compare as… (+57 more)

### Community 50 - "test_authz_principals_repo.py"
Cohesion: 0.06
Nodes (70): AdminAction, AuthProof, Evidence that a specific external identity is authenticated *right now*: the…, active_admin_principal_ids(), attach_verified_autodesk_identity(), _bound_principal_id(), build_admin_scope(), grant_admin_scope() (+62 more)

### Community 51 - "revit_link/router.py"
Cohesion: 0.05
Nodes (68): MintSyncTokenRequest, _audit_sync(), audit_sync_rejection(), execute_parameter_write(), execute_sync(), _gate(), Enum, SyncWithCentralRequest (+60 more)

### Community 52 - "test_relationships.py"
Cohesion: 0.07
Nodes (71): bfs_graph(), build_all_panel_circuit_edges(), build_panel_index(), build_system_index(), _device_panel_ref(), _emit_host_edge(), _emit_level_edge(), _emit_panel_circuit_edges() (+63 more)

### Community 53 - "test_help_library.py"
Cohesion: 0.03
Nodes (25): Phase 3.2' must stay one token - splitting it makes every phase query wrong., `write-back` must be reachable by someone who types `writeback`., roll back' must reach a doc that only ever writes 'Rollback'., do it' -> 'doit' is noise, not a compound., Two docs with byte-identical title/keywords/body (raw BM25 ties exactly):…, Zero token overlap with any real doc - distinct from a query that legitimately…, Used to claim a separate 'Schedules tab' and a render-mode switcher; the…, Schedules' used to be listed as its own tab; it's a Data-tab feature, not a tab. (+17 more)

### Community 54 - "get_element_group_at_tip"
Cohesion: 0.04
Nodes (58): get_element_group_at_tip(), Returns { elementGroupId: str, versionNumber: int } for the tip of the file.…, _acquire_relationships_lock(), _fetch_all_elements_for_relationships(), _load_relationships_blob_sync(), _load_warm_relationships(), Session, Assembled-relationships fetch engine + its in-process cache (ARCH-10).… (+50 more)

### Community 55 - "Rule"
Cohesion: 0.05
Nodes (64): _applies(), _blank(), _compiled(), evaluate_predicate(), _expected(), _finding(), _norm(), _num() (+56 more)

### Community 56 - "identity_router.py"
Cohesion: 0.07
Nodes (70): identity_link_state_secret(), HMAC key for identity-link OAuth states. Empty when unset — the caller MUST…, LinkStateClaims, LinkStateRefusal, Enum, str, Why a state was not honoured. Every one of these means DENY — none mean 'try…, The binding a valid state proves. Timestamps are epoch seconds (UTC). (+62 more)

### Community 57 - "test_change_set_service.py"
Cohesion: 0.05
Nodes (67): ChangeSetError, ChangeSetValidationError, InvalidChangeSetTransition, is_revit_unique_id(), next_status(), outcome_is_drift(), Exception, aec/change_set.py — Change Set service (Phase 13, Domain A Stage 1). PURE… (+59 more)

### Community 58 - "WriteApproval"
Cohesion: 0.05
Nodes (36): _approval(), An open approval scoped to CREATE_DETAILS' hub — what the router issues once…, _approval(), ApprovalRecordTests, _client(), ClientGateTests, _Clock, ConsentClampTests (+28 more)

### Community 59 - "test_qa_engine.py"
Cohesion: 0.08
Nodes (70): apply_overrides(), Run `rules` over `elements`; return a model-health report (see module…, Return a list of config problems with `rule` (empty list = valid). Call at the…, Apply per-scope rule overrides to `rules`, returning a NEW list. `overrides`…, run_checks(), validate_rule(), list_rules(), Self-describing catalog of every registered rule (served by GET /data/qa/rules). (+62 more)

### Community 60 - "graph_analysis.py"
Cohesion: 0.06
Nodes (67): analyze_electrical_topology(), analyze_mep_topology(), _anchor_component(), build_circuit_graph(), collect_topology(), _critical_g(), critical_panels(), _feeder_loops_g() (+59 more)

### Community 61 - "test_nl_filter_routing.py"
Cohesion: 0.05
Nodes (56): get_entry(), ModelCapabilities, ModelEntry, Enum, str, Compiled model registry — slice 1A of AI model routing. Single source of truth…, Structural invariants of the compiled registry. Returns a list of problems…, What the caller is asking the model to do. Drives kind-compat + defaults. (+48 more)

### Community 62 - "test_nl_filter_monitor.py"
Cohesion: 0.03
Nodes (53): Case, CaseRun, baseline(), _clean_runs(), fixture, Deterministic regression tests for the NL-filter drift monitor. These run in…, Flip the one parameter every Function-based expectation depends on. The…, A wrong hand-computed expected set is caught by the canonical replay, not only… (+45 more)

### Community 63 - "test_slack_pairing_db.py"
Cohesion: 0.06
Nodes (66): Slack Assistant Gateway (external chat-app gateway): one Slack workspace bound…, One (workspace, Slack user) -> exactly one BIMpossible user, set via the…, SlackUserBinding, SlackWorkspaceBinding, bind_channel(), create_oauth_state(), create_user_pair_code(), _normalize_code() (+58 more)

### Community 64 - "test_w9b_followup.py"
Cohesion: 0.04
Nodes (45): reset_single_flight(), L(), _memory_tier(), fixture, _Aps, _events(), _fresh(), _parse_main() (+37 more)

### Community 65 - "get_or_refresh_category"
Cohesion: 0.04
Nodes (63): get_categories(), get_or_refresh_category(), invalidate_all(), _load_warm_category(), _persist_category_rows(), Session, Cache layer: AEC Data Model API → PostgreSQL. get_or_refresh_category() is the…, Bulk-upsert one category's element rows into element_cache. F-5 — transaction… (+55 more)

### Community 66 - "AecUpstreamError"
Cohesion: 0.05
Nodes (59): _compute(), _probe_element_group_at_tip(), Kick one background upstream tip probe for (file_urn, project_id). No-op while…, Uncached remote probe. Raises AecUpstreamError (RuntimeError subclass) on any…, _schedule_tip_revalidation(), _revalidate(), AecErrorKind, AecUpstreamError (+51 more)

### Community 67 - "_clear_flags"
Cohesion: 0.08
Nodes (22): _body(), _clear_flags(), _clear_revit_link_cache(), _fail_if_called(), _fresh_router(), parametrize, Phase 7 step-2 — Revit Link SyncWithCentral re-enable guard tests. Companion to…, THE seam invariant: a denied caller must never even construct an engine. (+14 more)

### Community 68 - "fetch_shadow_observation"
Cohesion: 0.05
Nodes (49): assemble_shadow_observation(), datetime, timedelta, fetch_shadow_observation(), datetime, timedelta, DB glue for the shadow-mode observation window (plan v3 §7b.1). The math is…, Aggregate the SHADOW-mode would-deny stream into a :class:`ShadowObservation`… (+41 more)

### Community 69 - "test_autodesk_first_actors.py"
Cohesion: 0.05
Nodes (58): _aps_env_present(), _assert_no_secrets(), backfill(), _block_db_import(), _boom(), _boom_async(), _events(), _FakeSession (+50 more)

### Community 70 - "RevitLinkError"
Cohesion: 0.05
Nodes (55): classify_error(), EscalationTracker, Classify a RevitLinkErrorCode into row / systemic / escalating. Every code…, Decides whether a given error occurrence should halt a sequence. Pure policy,…, Record one outcome (an error code, or None for success) and return whether THIS…, Any, Exception, RevitLinkError (+47 more)

### Community 71 - "build_equipment_rows"
Cohesion: 0.07
Nodes (62): assemble_distribution_board_schedule(), assemble_electrical_equipment_schedule(), assemble_switchboard_schedule(), build_equipment_rows(), _family_contains(), _fmt_va_blank0(), _mains(), Electrical-Equipment-schedule shaping (Wave 4.8). Pure-Python — no… (+54 more)

### Community 72 - "test_transformer_schedule.py"
Cohesion: 0.06
Nodes (62): _phase_apparent_total(), Total apparent power across phases, distinguishing MISSING (None) from an…, assemble_transformer_schedule(), build_transformer_rows(), _format_impedance(), _format_kva(), _format_primary_voltage(), _format_secondary_voltage() (+54 more)

### Community 73 - "test_pdp_g1_texture_binding_routes.py"
Cohesion: 0.06
Nodes (61): _list_project_models(), Newest-last ordering key for a ``(version_id, model_urn)`` row (so…, Resolve the design-data ``model_urn`` for a lineage ``item_urn`` from server-…, Server-owned ``(item_urn, model_urn)`` candidates for a project (PDP G1 shared-…, _resolve_model_urn(), _version_sort_key(), _a2_versions(), _add_versions() (+53 more)

### Community 74 - "test_integrations_control_plane.py"
Cohesion: 0.06
Nodes (50): IntegrationDescriptor, known_kinds(), Adapter contract for Phase 17 integrations. An "integration kind" is one…, One integration kind as the control plane knows it., Phase 17.0 — Integration Control Plane (foundation slice). The reusable…, assert_integration_admitted(), IntegrationAdmissionDenied, _log_denial() (+42 more)

### Community 75 - "test_pdp_g1_sdk_proxy_core.py"
Cohesion: 0.08
Nodes (58): binding_from_manifest(), bound(), InvalidSdkPath, is_shared_texture_candidate(), ModelBinding, parse_cdn(), parse_file_segment(), parse_manifest_urn() (+50 more)

### Community 76 - "cross_firm_sharing.py"
Cohesion: 0.08
Nodes (63): account_shared_projects(), Grantee discovery: the projects OTHER firms currently share with the caller's…, active_share_for(), _audit(), audit_cross_firm_access(), audit_share_denied(), eligible_recipient_firms(), _firm_exists() (+55 more)

### Community 77 - "main.py"
Cohesion: 0.05
Nodes (58): stop(), assistant_enabled(), stop(), Lifespan shutdown hook: signal + cancel + await both loops. Idempotent no-op if…, stop(), close_aec_client(), Close the shared AEC DM httpx client during lifespan shutdown., Lifespan shutdown hook: signal + cancel + await the worker pool. (+50 more)

### Community 78 - "test_editor_recovery_dblane.py"
Cohesion: 0.07
Nodes (58): active_editor_user_uuids(), The role uuids of the firm's ACTIVE members holding an explicit view-editor row., actor_for(), apply_grant(), _armed(), audit_detail(), audit_editorless_reactivation(), build_parser() (+50 more)

### Community 79 - "test_hub_isolation.py"
Cohesion: 0.06
Nodes (60): _aps_project_in_hub(), Ask APS whether the project lives in this hub. Errors mean 'no'. Any 401 from…, Resolve project→hub: cache first, else probe the candidate hubs. Only ever…, resolve_project_hub(), _get(), get_issue(), _headers(), IssuesUpstreamError (+52 more)

### Community 80 - "test_admin_router.py"
Cohesion: 0.07
Nodes (60): _fresh(), fixture, W7.1a — GET /admin/authz/autodesk-first-telemetry: admin-gated, dark unless…, test_dark_by_default_returns_404(), test_enabled_returns_snapshot_with_pid(), test_requires_admin_even_when_enabled(), _admin_secret_env(), _canned_shadow_observation() (+52 more)

### Community 81 - "assistant_tools.py"
Cohesion: 0.06
Nodes (57): _compact_health(), _compact_relationship_summary(), _compact_topology(), _electrical_circuit_edges(), _is_filled(), _load_category(), _load_relationship_pool(), _observe_filter() (+49 more)

### Community 82 - "change_set_router.py"
Cohesion: 0.08
Nodes (61): apply_change_set(), _approval_history_reason(), approve_change_set(), ApproveBody, _assert_family_type_in_model(), _assert_read_hub(), create_change_set(), CreateChangeSetBody (+53 more)

### Community 83 - "derivative_proxy.py"
Cohesion: 0.06
Nodes (57): _build_upstream_url(), DerivativeUpstream, InvalidDerivativeUrn, proxy_derivative(), proxy_enabled(), proxy_mode(), ProxyDisabledError, Any (+49 more)

### Community 84 - "assistant_write_tools.py"
Cohesion: 0.06
Nodes (51): _apply_result_dict(), _count_conditions(), delete_saved_view(), _deny(), _describe_update(), _element_label(), _get_view(), _human_summary() (+43 more)

### Community 85 - "effective_access.py"
Cohesion: 0.07
Nodes (57): AccessLevel, Decision, normalize_action_set(), normalize_level(), Product, ProjectionRecord, Enum, Pure permission-projection logic — the security spine of the Authorization-… (+49 more)

### Community 86 - "aec/client.py"
Cohesion: 0.06
Nodes (57): _compute(), fetch_element_specs(), fetch_elements_by_category(), _get_http_client(), _gql(), invalidate_tip_cache(), list_categories(), _log_rate_headers() (+49 more)

### Community 87 - "test_context_search.py"
Cohesion: 0.06
Nodes (59): assemble_panel_context(), _context_counts(), _device_counts(), display_panel_name(), _fed_from(), group_panels_by_logical_name(), _is_marker(), match_panels() (+51 more)

### Community 88 - "_Request"
Cohesion: 0.08
Nodes (51): _Headers, new_request_id(), Protocol, Token, Per-request correlation id (W7.1a). Before Wave 7 no request-id middleware…, ``raw`` when it is a safe opaque token, else ``None`` (caller mints a fresh id)., Bind a request id for the duration of ``call_next`` and echo it on the response., _Request (+43 more)

### Community 89 - "test_change_set_router.py"
Cohesion: 0.14
Nodes (61): _approved_two_edit_set(), _as_user(), _cleanup(), _create_draft(), _drop_batch(), _edit_log_rows(), _firm(), _member() (+53 more)

### Community 90 - "admin_delegation_router.py"
Cohesion: 0.06
Nodes (56): _relock(), _audit(), grant_client_admin(), _GrantBody, _is_active_member_principal(), list_client_admins(), _live_scope_state(), _projects_reach_firm_hubs() (+48 more)

### Community 91 - "assemble_architectural_sheet_list_schedule"
Cohesion: 0.08
Nodes (21): _as_bool(), assemble_architectural_sheet_list_schedule(), _classify_kind(), _kind_order(), _parse_sheet_name(), Architectural sheet list schedule (Wave 10). Python port of…, Mirror parse.ts::classifyKind — sheet / legend / schedule / view., Return (number, title). Mirrors parse.ts::parseSheetName. (+13 more)

### Community 92 - "test_artifact_producer.py"
Cohesion: 0.07
Nodes (50): _build_index_summary(), canonical_payload_hash(), capture_manual_attestation_draft(), generate_model_derived_draft(), Any, UUID, Trusted producers for Track-2 published-artifact provenance (AUTH-INH Phase 5…, Server-generate a model-derived draft and stage it. The payload is computed… (+42 more)

### Community 93 - "authz_request_scope"
Cohesion: 0.07
Nodes (56): authz_request_scope(), memoize(), on_scope_close(), Any, Request-scoped memo for authorization lookups that must NOT be process-cached.…, Run ``fn`` when the current request scope unwinds. No scope bound ⇒ silently…, True when a request scope is open (used by tests to prove the memo is actually…, Return ``compute()``, served from the request memo when this ``key`` was… (+48 more)

### Community 94 - "test_teams_security.py"
Cohesion: 0.06
Nodes (59): _bearer_token(), _expected_issuer(), _get_signing_key(), _jwks_uri(), _metadata_url(), Microsoft Teams Assistant Gateway -- inbound request authentication. THE…, Drop the cached JWKS client (tests, and any future key-roll forcing)., Extract the JWT from an `Authorization` header, or None. Starlette decodes… (+51 more)

### Community 95 - "test_identity_router.py"
Cohesion: 0.11
Nodes (50): LinkedIdentityView, What the UI may see about one link. No subject, no raw issuer, no token…, LinkDecision, _attach(), burn(), _BurnStore, _client(), _FakeSession (+42 more)

### Community 96 - "UserRole"
Cohesion: 0.07
Nodes (54): assert_firm_keeps_an_editor(), Collection, Session, UUID, Lock the firm and raise 409 ``last_editor`` if removing editor authority from…, Per-user role flags (SEC-M4). Replaces the global…, UserRole, _flag() (+46 more)

### Community 97 - "test_enrichment_mapping.py"
Cohesion: 0.09
Nodes (49): ClearbitBackend, _default_backend(), enrich_firm(), EnrichmentBackend, EnrichmentResult, ManualBackend, Protocol, Provider-agnostic company enrichment. enrich_firm(domain, backend) ->… (+41 more)

### Community 98 - "test_phase1_safety.py"
Cohesion: 0.05
Nodes (28): _clear_revit_link_cache(), _find_names(), _parse_source(), Module, parametrize, Path, Phase 1 safety regression tests. Validates: 1. native_adapter._relay_secret()…, Raw str(exc) must not be returned in JSONResponse content. (+20 more)

### Community 99 - "RelationshipPrewarmJob"
Cohesion: 0.07
Nodes (54): has_done_job(), job_is_running(), mark_done(), Session, OD2 Phase 4 — relationship pre-warm queue primitives. A durable Postgres job…, Return a job to 'pending' for a bounded retry. `attempts` was already bumped by…, Reset 'running' jobs back to 'pending'. Called once on worker startup: a job…, Reset 'running' jobs whose updated_at is older than the threshold back to… (+46 more)

### Community 100 - "run_agent_turn"
Cohesion: 0.09
Nodes (50): _pop_pending(), P15-15D: prepend ONE structured write-result event to a resume() stream so the…, Convert Anthropic SDK content blocks to plain dicts for JSON storage., Drive the tool-use loop. Yields contract events: {'type': 'text-delta'|'tool-…, run_agent_turn(), _serialize_content(), _store_pending(), _with_write_result_event() (+42 more)

### Community 101 - "env_flag"
Cohesion: 0.06
Nodes (48): identity_selfservice_active(), lifecycle_active(), True when the /account/identity self-service surface is mounted (default…, True when the project-unenrollment purge admin surface is enabled (default…, Dark-by-default product flag for the Track-2 v2 role-scoped content subsystem…, track2_content_enabled(), _mounted(), _paths() (+40 more)

### Community 102 - "ResourceRecord"
Cohesion: 0.10
Nodes (23): CustomClientErrorTypeTests, EmptyLedgerTests, _full_ledger(), PartialFailureTests, ProtocolAndDataclassTests, Pure-lane tests for the Phase 8 provisioning rollback walker (§10). Dedicated…, rollback catches any Exception and records type(exc).__name__: str(exc)., ResultOkPropertyTests (+15 more)

### Community 103 - "test_firm_docs_unit.py"
Cohesion: 0.06
Nodes (46): Chunk, chunk_markdown(), Heading-path-aware markdown chunking, vendored from the docindex algorithm…, Split markdown into retrievable chunks at heading boundaries. Sections longer…, build_index(), _fingerprint(), load_or_rebuild(), Per-firm BM25 chunk index: build, persist (versioned + fingerprinted), load… (+38 more)

### Community 104 - "test_firm_onboarding.py"
Cohesion: 0.10
Nodes (54): get_active_membership(), The user's ACTIVE membership row, or None. Single query both firm-id resolution…, as_user(), _audits(), _dom(), _fresh_ip(), _history(), _proxied_client() (+46 more)

### Community 105 - "_normalize_element"
Cohesion: 0.07
Nodes (47): _build_type_lookup(), _build_type_uid_lookup(), _infer_level_from_host(), _is_type_element(), _normalize_element(), Pure AEC element normalization — no DB, no SQLAlchemy. Split out of…, Build { (family_name, type_name): ElementType.UniqueId } from raw type element…, Convert a raw AEC DM element into a stable BIMpossible dict. Identity comes… (+39 more)

### Community 106 - "UserFirmMembership"
Cohesion: 0.08
Nodes (47): UserFirmMembership, main(), Seed synthetic users/firms/sessions for the synthetic-concurrency-audit skill.…, Refuse to run without an explicit operator opt-in. "Local stack only" was a…, require_synthetic_optin(), _guard(), main(), Path (+39 more)

### Community 107 - "session.py"
Cohesion: 0.06
Nodes (46): assistant_scope(), _guard(), P1-epsilon: least-privilege write guard for the assistant's tool scope. The…, Mark the current context as 'assistant tool dispatch in progress'., build_observation(), _coerce_uuid(), normalize_filter_tree(), Any (+38 more)

### Community 108 - "test_assistant_loop.py"
Cohesion: 0.07
Nodes (32): Serialize an async event-stream as SSE frames, injecting ': keep-alive'…, _sse_with_heartbeat(), _Block, _collect(), FakeClient, FakeMessages, _msg(), Wire _with_reservation for a fail-closed test: fast cadence, captured settle,… (+24 more)

### Community 109 - "_mock_db"
Cohesion: 0.13
Nodes (17): create_saved_view(), Create a new saved view. Returns the created view dict or raises on failure., Set a firm view as the firm default. Caller must be firm_view_editor., set_default_view(), IntegrityError, _apply_patches(), _mock_db(), _patch_identity() (+9 more)

### Community 110 - "access.py"
Cohesion: 0.07
Nodes (52): bind_projects(), _bindings(), can_manage(), can_read(), can_upload(), DocMeta, _gate_engaged(), grant_capability() (+44 more)

### Community 111 - "test_production_readiness_preflight.py"
Cohesion: 0.08
Nodes (51): main(), Options, parse_env_file(), planned_checks(), Path, Parse a dotenv-style file WITHOUT normalising values. ``KEY=VALUE`` per line;…, run_checks(), _af_check() (+43 more)

### Community 112 - "AsyncTTLCache"
Cohesion: 0.07
Nodes (51): _counting_compute(), _populate(), F-4: bounded LRU eviction for AsyncTTLCache. The shared TTL-cache primitive…, max_entries defaults to None → no eviction (existing callers unchanged)., N-17: invalidate() must drop the per-key lock alongside the entry, the same…, Seed `cache` with one entry + per-key lock per key (sync, no event loop needed)., Tuple-keyed cache (mirrors _RELATIONSHIPS_CACHE's (project, model, version)): a…, Lock co-eviction (same contract as invalidate()/F-4): each evicted key's per-… (+43 more)

### Community 113 - "test_view_render_mode.py"
Cohesion: 0.07
Nodes (54): _create_url(), _list_url(), Wave 4 Session 3 — renderMode + panelUniqueId contract tests. Locks the saved-…, row_table forcibly clears any panelUniqueId payload — the contract guarantees…, Transitioning to panel_layout requires panelUniqueId on the wire (or already-…, row_table forcibly clears the panel binding even if the PATCH did not…, lighting_fixture_schedule behaves like row_table — no panel binding required. A…, Unknown render modes must be rejected with 400 (regression guard). (+46 more)

### Community 114 - "key_service.py"
Cohesion: 0.08
Nodes (51): get_firm_key(), get_user_key(), KeyTooShortError, list_firm_keys(), list_user_keys(), Any, Session, UUID (+43 more)

### Community 115 - "test_nl_filter_validation.py"
Cohesion: 0.11
Nodes (52): Return True if tree is a structurally valid FilterTree with allowed column…, _validate_filter_group(), _validate_filter_tree(), _group(), _install_import_stubs(), _leaf(), parametrize, Characterization tests for the NL-filter security validators… (+44 more)

### Community 116 - "test_teams_pairing_db.py"
Cohesion: 0.06
Nodes (52): _membership_cleanup(), model_index_cleanup(), A user who really is (or isn't) a member of `firm_id` -> its derived UUID.…, Track ModelIndex project_ids to hard-delete on teardown. Test project ids are…, #291: scoped by `source` so a seeded row never leaks between tests., cleanup(), db(), _firm() (+44 more)

### Community 117 - "test_authz_principal.py"
Cohesion: 0.07
Nodes (48): admin_can_act(), can_remove_admin(), CanonicalPrincipal, evaluate_link(), ExternalIdentity, governing_track(), IdentityProvider, datetime (+40 more)

### Community 118 - "test_usage_ledger_1b.py"
Cohesion: 0.12
Nodes (42): pytestmark_loop, _Block, denials(), _FakeClient, _FakeMessages, _msg(), _OverloadedMessages, fixture (+34 more)

### Community 119 - "test_autodesk_first_workers.py"
Cohesion: 0.07
Nodes (45): _background_sid(), _check_once(), _classify(), _grant_selected_projects(), _jobs(), _load_script(), _narrow_actor(), Exception (+37 more)

### Community 120 - "test_circuit_schedule.py"
Cohesion: 0.09
Nodes (49): assemble_circuit_schedule(), build_circuit_rows(), circuit_synthetic_id(), _format_load_type(), _format_percent(), _load_type_summaries(), _panel_load_summaries(), Circuit-schedule shaping (Wave 4.8). Pure-Python — no fastapi/DB/AEC-DM imports… (+41 more)

### Community 121 - "CredentialSelection"
Cohesion: 0.06
Nodes (38): CredentialSelection, Tagged outcome of firm credential resolution (model routing slice 1A). tag…, True only for a verified customer key (tag ok, non-null key) on a BYOK route., The key to hand the provider client: the firm's key on the BYOK route, None (=…, ModelPricing, USD per million tokens. `pricing_version` dates the numbers (anchor C-2)., buckets_from_usage(), estimate_cost_usd() (+30 more)

### Community 122 - "admin_auth.py"
Cohesion: 0.06
Nodes (45): AdminBootstrapInvariantError, bootstrap_admin_roles(), is_admin_email(), Request, RuntimeError, Session, Admin authorization: verified Google identity + active admin_roles row. The…, Verify a Google ID token; return the verified email. Raises 401 on any failure.… (+37 more)

### Community 123 - "test_ai_context_policy.py"
Cohesion: 0.07
Nodes (43): Fail-closed policy lookup for the (firm, project) pair (testable seam).…, resolve_ai_context_policy(), get_ai_context_policy(), lookup_ai_context_policy(), Session, Per-project assistant access tier lookup (Phase 6 / access billing). Returns…, Return the (firm, project) AI context policy, FAIL CLOSED. 'help_only' → the…, Resolve the policy ``firm_id`` recorded for ``project_id``, FAIL CLOSED. The… (+35 more)

### Community 124 - "track2_content_router.py"
Cohesion: 0.07
Nodes (50): B4a entitlement ceiling (+ D1 firm capability enrollment when ``firm_id`` is…, _AccessOut, _active_principal_ids(), _admin_audit(), _assert_audience_principals(), _assert_hub(), _autodesk_first_read_ceiling(), check_access() (+42 more)

### Community 125 - "test_membership_lifecycle_cascade.py"
Cohesion: 0.09
Nodes (45): PrincipalAdminScope, Client-admin delegation, explicit-scope (plan §7a.9). A dedicated side table…, admin_client(), _assert_bystanders_untouched(), _assert_target_cascaded_in_a(), _audits(), _fresh(), _history_unchanged() (+37 more)

### Community 126 - "scheduler.py"
Cohesion: 0.08
Nodes (42): AclSourceFactory, authz_scheduler_enabled(), get_stats(), _null_source_factory(), Any, datetime, Event, timedelta (+34 more)

### Community 127 - "support_explain.py"
Cohesion: 0.09
Nodes (36): _default_session_factory(), explain(), Explanation, _flag(), _gate_emergency(), _gate_entitlement(), _gate_firm(), _gate_flag() (+28 more)

### Community 128 - "test_firm_docs_cka_authz_dblane.py"
Cohesion: 0.11
Nodes (48): FirmDocumentCapability, PermissionProjection, CKA-owned explicit elevated capability grant (migration b7c8d9e0f1a2):…, Per-(principal, project, resource) effective-access projection — the persisted…, _as(), _cap_audits(), _cap_rows(), _draft_member_with_grant() (+40 more)

### Community 129 - "test_assistant_live_read.py"
Cohesion: 0.05
Nodes (18): _FakeBlock, _FakeStore, parametrize, Pins for the P15-15C-B live-read contracts and pending broker (slices 1-2).…, Stands in for an Anthropic SDK content block: attribute-addressed, not JSON-…, redis_backend(), _resume(), test_injection_text_survives_only_as_clamped_data() (+10 more)

### Community 130 - "test_model_policy_router.py"
Cohesion: 0.12
Nodes (41): _actor(), _client(), _FakeSession, _plan(), fixture, Model routing slice 2: the /account/model-policy HTTP surface (GET member-…, claude-opus-5 is BYOK-only (supported_for_platform=False); a firm on the…, No registry entry is background-only today (chat is in every active entry's… (+33 more)

### Community 131 - "compute_alerts"
Cohesion: 0.08
Nodes (42): Event, Alert-state refresh background worker (AST-M4, 2026-07-10 audit). aec/alerts.py…, Recompute + upsert firm_alert_state for every firm. Best-effort per firm., _refresh_loop(), _refresh_once(), start(), _alert(), compute_alerts() (+34 more)

### Community 132 - "artifacts_router.py"
Cohesion: 0.09
Nodes (48): Map an ORM row into the pure decision's read-model., to_view(), _admin_audit(), _ArtifactContentOut, _ArtifactOut, _assert_hub(), _autodesk_first_read_ceiling(), capture_manual_draft() (+40 more)

### Community 133 - "test_log_redaction.py"
Cohesion: 0.07
Nodes (32): The signed-in user's identity + token, resolved once per request., UserScope, _assert_clean(), _blob(), _log_calls(), parametrize, W5 P1F item 12: no raw URN, id or upstream exception text reaches a log line.…, Log calls in ``path`` (filtered by their source text) that are log.exception,… (+24 more)

### Community 134 - "test_client_ip.py"
Cohesion: 0.10
Nodes (45): client_ip(), _forwarded_client(), load_config(), _parse_address(), parse_config(), Request, Client address for rate-limit keying behind an explicitly trusted proxy. The…, Bare IP address or None. Rejects "ip:port" and "[v6]"; folds IPv4-mapped IPv6… (+37 more)

### Community 135 - "test_model_resolve.py"
Cohesion: 0.09
Nodes (41): EffectiveProjectAccess, HubAccess, One granted hub. project_ids is None for all_projects (every project in the…, A firm's full (hub → HubAccess) map. Empty map = no access at all — the default…, (projectGuid, modelGuid) from a version-tip payload, or None. None when: not a…, tip_cloud_guids(), _binding_client(), _client() (+33 more)

### Community 136 - "_el"
Cohesion: 0.10
Nodes (12): assemble_ict_cctv_schedule(), build_ict_cctv_rows(), _mark_sort_key(), Instance-grain CCTV/security-camera rows, sorted by Mark. All elements from…, assemble_ict_data_outlet_schedule(), build_ict_data_outlet_rows(), _mark_sort_key(), Instance-grain data-outlet rows (data jacks, network drops), sorted by Mark.… (+4 more)

### Community 137 - "test_chat_gate_cache_only_dblane.py"
Cohesion: 0.08
Nodes (31): _Decision, _FakeDb, _FakeQuery, no_probe(), _no_raw_ids(), fixture, parametrize, W9 lane C — Slack / Teams project gate: hashed denial logs (F7) and a real… (+23 more)

### Community 138 - "guard_derived_read"
Cohesion: 0.08
Nodes (41): env_enforcement_mode(), parse_mode(), Rollout configuration for the Authorization-Inheritance read gate — mode…, Parse a mode string (env value or DB column) into an ``EnforcementMode``. Unset…, The global/bootstrap enforcement mode from the environment (default OFF)., Resolve the effective mode for one firm. A per-firm override (a stored mode…, resolve_mode(), _current_correlation_id() (+33 more)

### Community 139 - "slack/router.py"
Cohesion: 0.08
Nodes (43): GatewayMembershipDenied, Exception, Raised by a pairing redeem when the code's BIMpossible user is not an active…, Returns (firm_id, user_uuid). Raises 401 if the user is not authenticated or…, require_identity(), exchange_oauth_code(), post_ephemeral(), post_message() (+35 more)

### Community 140 - "test_prewarm_worker.py"
Cohesion: 0.08
Nodes (34): process_next(), Claim and process one pending job. Returns True if a job was handled (so the…, One stale-'running'-job reclaim pass in its own short session. Separated from…, sweep_stale_jobs(), _async(), _cleanup(), _enqueue(), _only_job_id() (+26 more)

### Community 141 - "QaAnalysisRun"
Cohesion: 0.11
Nodes (46): compare_runs(), _engine_version(), _finding_detail(), _finding_out(), history_retention_runs(), list_history(), _match_key(), _prune_retention() (+38 more)

### Community 142 - "spec_generator.py"
Cohesion: 0.06
Nodes (47): canonical_for_element(), _clause_included(), _condition_passes(), _distinct_values(), _efficacy_analysis(), _element_satisfies(), _infer_from_name(), library_for_category() (+39 more)

### Community 143 - "test_artifacts_router.py"
Cohesion: 0.11
Nodes (37): _client(), _draft(), _FakeSession, fixture, Track-2 v1 published-artifact HTTP surface (AUTH-INH Phase 5, plan §5.6). DB-…, A caller with no Autodesk session hits the hub probe on a cache MISS (401) and…, Neutral defaults: hub allows, membership resolves to a principal+member role,…, _row() (+29 more)

### Community 144 - "test_authz_share_owner_liveness.py"
Cohesion: 0.08
Nodes (38): _DB, _matches(), parametrize, _Query, Owner liveness is load-bearing for a cross-firm share allow (review pass-2 #2).…, The owner was removed from the project in ACC and reconcile deleted its rows.…, CURRENT without provenance" is the projection's own fail-closed case; the owner…, The projection is keyed per principal, so "the owner firm still reaches this"… (+30 more)

### Community 145 - "proxy_router.py"
Cohesion: 0.09
Nodes (45): _authorize(), _correlation_id(), _gate(), _no_store(), proxy_derivative_asset(), _proxy_download_gate(), _proxy_gate(), proxy_manifest() (+37 more)

### Community 146 - "cross_model_join.py"
Cohesion: 0.09
Nodes (44): _as_region(), _blank_door_result(), EquipmentInput, _group_rooms_by_band(), LinkedDoorRoomsResult, LinkedRoomResult, _merge_linked_room_columns(), _most_common_phase() (+36 more)

### Community 147 - "test_project_enrollment.py"
Cohesion: 0.11
Nodes (43): _audit(), enroll_project(), is_enrolled(), list_enrollments(), _locked_hub_grant(), Session, UUID, Per-firm project enrollment — the write side of firm_allowed_projects. A hub… (+35 more)

### Community 148 - "service.py"
Cohesion: 0.09
Nodes (44): ingest_document(), live_docs(), new_doc_id(), _now(), purge_due_documents(), purge_firm_documents(), datetime, Session (+36 more)

### Community 149 - "check_firm_view_editor"
Cohesion: 0.09
Nodes (25): check_firm_model_editor(), check_firm_view_editor(), grant_firm_model_editor(), is_firm_view_editor(), SEC-M4: DB-backed per-user firm-view-editor check. Looks up the user_roles row…, DB-backed per-user live-Revit-write permission check. Looks up the user_roles…, Upsert the is_firm_model_editor flag for (user_uuid, firm_id). Preserves any…, _mock_db() (+17 more)

### Community 150 - "test_aps_read_token_refresh_leak.py"
Cohesion: 0.08
Nodes (40): _index_write_allowed(), review-all pass-9 F2. May the read that ``outcome`` authorized also write…, aps_auth(), aps_router(), _getter(), _http_status_error(), Exception, fixture (+32 more)

### Community 151 - "RedisStore"
Cohesion: 0.06
Nodes (31): True sliding window via a sorted set pipeline. Matches MemoryStore.hit_window…, Distributed implementation of SharedStore backed by Redis 7., Raise if Redis is unreachable (the /health readiness probe). Uses its own…, Return all live keys matching prefix* together with their values. Uses SCAN…, RedisStore, _auth(), _expired_session(), _make_lock_timeout_cm() (+23 more)

### Community 152 - "test_aps_cache.py"
Cohesion: 0.05
Nodes (44): _fake_paginated_authed_get(), _fake_tree_authed_get(), _FakeJSONHit, _grant_all_projects(), fixture, Wave 4.6.6 Session A — APS pooling + TTL cache (tests). Mirrors Wave 4.6.5…, clear() empties every cached entry (so the next call recomputes) AND the per-…, Yield the stashed real aps.router (collected from sys.modules at this test… (+36 more)

### Community 153 - "ApsWriteError"
Cohesion: 0.10
Nodes (27): ApsWriteErrorTests, _account_id_from_hub(), ApsWriteError, ApsWriteHttpClient, _contained_source_path(), _error_excerpt(), _parse_object_urn(), Any (+19 more)

### Community 154 - "assistant_schemas.py"
Cohesion: 0.06
Nodes (38): live_read_enabled(), all_tools_for_state(), live_read_tools_for_state(), Native Claude tool definitions for the Phase 4a read-only assistant + system-…, The live-read tool, offered only when BIMPOSSIBLE_ASSISTANT_LIVE_READ_ENABLED…, Write tools offered to the model this turn. The saved-view write tools are…, Full tool catalog for a normal (non-help-only) turn, honoring the live-write…, write_tools_for_state() (+30 more)

### Community 155 - "test_categories_cache.py"
Cohesion: 0.08
Nodes (30): key_categories(), _clear_categories_cache(), _fake_list_categories(), _fake_tip(), fake(), _FakeStore, _patch_persist(), _patch_supporting() (+22 more)

### Community 156 - "test_w9b_review_fixes.py"
Cohesion: 0.06
Nodes (27): ConnectionError, boom(), ceiling(), _CeilingDb, _dead_cache(), _DeadClient, _env(), _fresh() (+19 more)

### Community 157 - "test_assistant_tools.py"
Cohesion: 0.05
Nodes (18): _elec_loaders(), _NullSession, Stand-in session for handler tests that monkeypatch the data loaders: the…, Pillar 3 (audit G3): every match carries its doc slug so the UI can render a…, Pillar 3 Groups parity: an unidentified caller (no firm) sees NO groups —…, _reset_ctx_pool_cache(), _run_circuit_filter_cache(), test_analyze_electrical_topology_tool_flags_unconnected() (+10 more)

### Community 158 - "test_enrollment_endpoints.py"
Cohesion: 0.07
Nodes (37): admin_client(), as_firm_admin(), _audits(), _commit_raising(), _commit(), _fake_visible_hubs(), _fake(), _FakeDiag (+29 more)

### Community 159 - "teams/router.py"
Cohesion: 0.10
Nodes (43): build_project_context(), Policy-brokered project context for the assistant system prompt. * Resolves the…, _generate_title(), _persist_turn(), Pass agent events through unchanged, but capture the final answer and (after…, One-shot background-model summary of the first user message into a short title.…, _answer_question(), _answer_question_impl() (+35 more)

### Community 160 - "teams/pairing.py"
Cohesion: 0.08
Nodes (41): Microsoft Teams Assistant Gateway (external chat-app gateway): one Entra tenant…, One (tenant, Teams user) -> exactly one BIMpossible user, set via the single-…, One (tenant, conversation) -> one BIMpossible project AND one model. The Teams…, TeamsConversationBinding, TeamsTenantBinding, TeamsUserBinding, bind_conversation(), conversation_key_for() (+33 more)

### Community 161 - "FakeProvisioningClient"
Cohesion: 0.10
Nodes (18): ExecutorTests, FakeProvisioningClient, _items(), Pure-lane tests for the provisioning executor (Phase 8). Stdlib unittest, in-…, Records creates/resolves/deletes; can be told to fail on a given name/path., Hand-built plan exercising the executor's full item vocabulary (project clone →…, ApsProvisioningClient, ExecutorError (+10 more)

### Community 162 - "ClientBudget"
Cohesion: 0.09
Nodes (38): BudgetBody, upsert_budget(), check_preflight_budget(), get_tokens_used(), datetime, UUID, Per-firm assistant budget gate (Phase 6 / hard cost guardrails). Preflight…, Sum output_tokens for this firm over the rolling window. (+30 more)

### Community 163 - "assistant_live_read.py"
Cohesion: 0.09
Nodes (26): _block_to_jsonsafe(), _clean(), DocumentBinding, _jsonsafe_state(), LiveReadElementIn, LiveReadErrorIn, LiveReadRequestOut, LiveReadResultIn (+18 more)

### Community 164 - "test_admin_delegation_router.py"
Cohesion: 0.08
Nodes (26): client_admin_delegation_enabled(), True iff the client-admin delegation surface is mounted (dark by default)., _client(), _entity_name(), _FakeQuery, _FakeSession, fixture, TestClient (+18 more)

### Community 165 - "test_circuits.py"
Cohesion: 0.12
Nodes (41): build_circuit_rows(), infer_circuit_load_type(), Circuits as a virtual category (Wave 4.5.5 Session 1, extended Wave 4.5.6).…, Build a flat list of circuit-row records aggregated across all panels. Args:…, Raw section suffix on the panel ("(SEC 2)") or "" when absent., Best-effort load_type for a circuit based on the connected devices. Picks the…, _section_label(), _device() (+33 more)

### Community 166 - "test_domain_names.py"
Cohesion: 0.08
Nodes (33): DomainInvalid, normalize_domain(), ValueError, Email-domain normalization for firm domain claims (Phase 6 Client-Mgmt E).…, The supplied text is not a usable, bare email domain. The message is user-safe…, Return the canonical lowercase ASCII form of ``raw`` or raise DomainInvalid.…, Challenge, check_txt() (+25 more)

### Community 167 - "UpstreamResponse"
Cohesion: 0.06
Nodes (21): A raw upstream (or mock) response. ``headers`` keys are lower-cased. Either…, Drain ``stream`` into ``body`` (for the cacheable manifest path). No-op when…, UpstreamResponse, HttpDerivativeUpstream, HttpSdkUpstream, Real APS upstream: fetches derivative bytes via the pooled APS client. Bearer…, Same pooled client, but redirects are NEVER followed: the SDK proxy maps any…, _Upstream (+13 more)

### Community 168 - "migrate.py"
Cohesion: 0.08
Nodes (41): assert_single_head(), _config(), _current_revision(), ensure_assistant_readonly_role(), ensure_schema_ready(), get_heads(), MultipleHeadsError, RuntimeError (+33 more)

### Community 169 - "TestClient"
Cohesion: 0.09
Nodes (39): TestClient, _as_user(), P3-8-DYN: cross-firm read/write isolation, now that get_firm_id() can resolve…, Sanity check on the write side of isolation: a view User A creates is scoped to…, Route every get_autodesk_user_id() import site to `user_id`, matching the…, test_firm_b_cannot_delete_firm_a_view(), test_firm_b_cannot_patch_firm_a_view(), test_firm_b_cannot_see_firm_a_firm_scoped_view() (+31 more)

### Community 170 - "test_consent.py"
Cohesion: 0.09
Nodes (38): _clear(), SEC-CONSENT-REUSE-1 (2026-08-17 weekly audit) — the elevated write-scoped token…, test_expired_token_dropped_even_with_uses_left(), test_max_uses_never_exceeds_autodesk_ttl_bound(), test_token_reusable_up_to_cap_then_forces_reconsent(), Unit tests for wizard/consent.py — the provision-time elevated-consent token…, The point of the assertion above is scope CREEP control, so state the invariant…, test_autodesk_expiry_shorter_than_session_ttl_wins() (+30 more)

### Community 171 - "serving.py"
Cohesion: 0.12
Nodes (40): _model_readable(), Per-model read authorization for the navigation allowlist. Mirrors…, emergency_deny_active(), True when the break-glass emergency-deny lookup should run on the serving path…, EnforcementOutcome, Result of applying a mode to a decision. ``serve`` — whether the caller…, guard_read(), guard_read_lazy_firm() (+32 more)

### Community 172 - "test_track2_content_authz.py"
Cohesion: 0.10
Nodes (40): The read-model an authorization decision needs — the immutable subset of a…, authorize_track2_content_read(), _in_audience(), AccessLevel, datetime, Enum, SourceAuthorizer, str (+32 more)

### Community 173 - "test_coordination_report.py"
Cohesion: 0.10
Nodes (40): build_header(), build_report_payload(), build_trace_examples(), describe_critical_hubs(), _esc(), _finding_line(), generate_coordination_report(), Any (+32 more)

### Community 174 - "test_filter_eval.py"
Cohesion: 0.08
Nodes (40): apply_filter(), _eval_leaf(), _eval_node(), _field_value(), FilterDepthError, FilterOperatorError, _num(), ValueError (+32 more)

### Community 175 - "effective_project_access"
Cohesion: 0.09
Nodes (40): effective_project_access(), Resolve the firm's live hub grants + enrollments into one access map. While…, _clean_grant_rows(), parametrize, Teardown invariant — the legacy ALLOWED_PROJECT_IDS / guard.py subsystem is…, None of the dedicated allowlist modules exist any longer. Import must fail at…, The gate functions are gone from the codebase, not merely relocated. If any…, The ORM model was deleted, so `allowed_projects` must not be registered on the… (+32 more)

### Community 176 - "test_param_aliases.py"
Cohesion: 0.09
Nodes (38): alias_map(), AliasMap, contexts(), ParamAlias, Canonical names in declaration order., The validated AliasMap for `(firm, context)`. Maps are built once at import;…, Registered context names for `firm`, in declaration order., One canonical parameter and the ordered candidate keys it surfaces under.… (+30 more)

### Community 177 - "test_qa_router.py"
Cohesion: 0.09
Nodes (41): get_model_health(), Model-health report: overall score + per-rule compliance + findings. Read-only.…, _call_export(), _call_health(), _cleanup(), _deny_access(), _good_token(), _job_count() (+33 more)

### Community 178 - "test_autodesk_first_read_paths.py"
Cohesion: 0.12
Nodes (37): _as_user(), _scope(), _assert_no_foreign_leak(), _flag(), parametrize, Option B / B4 part a: the Autodesk-first ceiling on user-initiated READ paths.…, C4: one firm-wide index; each user sees the slice their own Autodesk token…, C4: user-b saves the firm's presets; user-a (also entitled to the project)… (+29 more)

### Community 179 - "test_synthetic_seed_optin_guard.py"
Cohesion: 0.07
Nodes (40): _assert_refused(), clean_init_handlers(), _fire_init(), _import_locustfile(), _locustfile_path(), fixture, Path, WSR16 / CQ-SYNTH-HOST-ENV-1 — the load generator must refuse a non-loopback… (+32 more)

### Community 180 - "test_identity_link_flow.py"
Cohesion: 0.11
Nodes (39): _b64d(), _b64e(), _epoch(), evaluate_unlink(), issuer_label(), mint_state(), datetime, Pure core for the self-service identity-link flow (AUTH-INH plan §7b.4). What… (+31 more)

### Community 181 - "test_classification_enrichment.py"
Cohesion: 0.08
Nodes (39): enrich_classification(), enrich_classification_batch(), get_classification_for_category(), _is_populated(), _make_enriched_value(), Any, BIMpossible — Classification Enrichment Layer Wave 4.9 — lookup tables +…, Return True if any alias in the set has a non-empty value in parameters. (+31 more)

### Community 182 - "test_cross_model_join_doors.py"
Cohesion: 0.09
Nodes (39): _merge_door_room_columns(), Phase 3.10b — the Doors counterpart of _merge_linked_room_columns. Same…, _door(), Phase 3.10b — Doors room-pair join tests. Pure-function tests, no network/DB.…, The federated-overlay case, measured 2026-08-04 on mv 742: a shell/core arch…, The deliberate cost of boundary-native scoring (2 doors of 782 on the live…, The regression guard for finding #1. At the MEP 3.0 ft cap a door sweeps up…, Finding #2: unbanded, the pair rate is 1.5% — a door is within 0.5 ft in XY of… (+31 more)

### Community 183 - "sanitize_filename"
Cohesion: 0.09
Nodes (39): Returns (ascii_safe, pct_encoded) per RFC 6266 / TC2231. ascii_safe: ctrl/path-…, sanitize_filename(), parametrize, filename_utils — adversarial / behavioral tests for sanitize_filename.…, test_ascii_boundary_char_127_stripped_128_underscored(), test_ascii_safe_is_always_pure_ascii(), test_ascii_safe_never_contains_crlf_for_arbitrary_input(), test_cjk_name_each_char_to_underscore() (+31 more)

### Community 184 - "test_cold_load_perf.py"
Cohesion: 0.08
Nodes (40): _rate_limit_backoff_seconds(), Seconds to gate a rate-limited job before re-claim. Honors a server Retry-After…, _resolve_concurrency(), _arch_room_prewarm_enabled(), _proactive_prewarm_enabled(), Kill-switch for the model-open proactive category warm (cold-load perf).…, Enqueue a durable category-warm job per category so the background pool warms…, Kill-switch for the model-open architectural room-geometry warm (Phase 3.10a).… (+32 more)

### Community 185 - "test_qa_ids_import.py"
Cohesion: 0.10
Nodes (39): _category_for(), _numeric_bound(), parse_ids(), parse_ids_report(), _q(), buildingSMART IDS (.ids) import → QA Rules (Phase 11). Parses the common IDS…, Return (op, value) from a <value> facet's xs:restriction, or (None, None)., Parse an IDS document into QA Rules, plus which specs used an unmapped IFC… (+31 more)

### Community 186 - "sdk_proxy.py"
Cohesion: 0.07
Nodes (36): ProxyResult, What the router turns into an HTTP response. ``served`` is False for an…, authorized_same_project_texture_root(), _bad_gateway(), _close(), _deny(), _inflight_map(), _manifest_cache_key() (+28 more)

### Community 187 - "production_readiness.py"
Cohesion: 0.13
Nodes (39): EnvCheck, FlagFamily, _alembic_head_result(), _check_admin_bootstrap(), _check_aps(), _check_autodesk_first(), _check_autodesk_first_requires_redis(), _check_cross_firm_sharing() (+31 more)

### Community 188 - "test_aps_hub_isolation.py"
Cohesion: 0.09
Nodes (33): _assert_enroll_denied(), _probe_recorder(), Phase 6 (2026-08-06) — /aps route-level hub isolation. DB/app lane.…, Satisfy both auth layers ahead of the hub verdict: the router-level session…, require_project_in_firm_hub_path on /aps/project/{id}/top-folders., require_project_in_firm_hub (query) on /aps/model/manifest., Hub gate satisfied + project ENROLLED -> the handler runs. PROJ is NOT in any…, The unenrolled 403 — distinct from the cross-hub deny, so a client can tell… (+25 more)

### Community 189 - "test_track2_content_router.py"
Cohesion: 0.14
Nodes (32): _allow_seams(), _client(), _FakeSession, _get_access(), _grant_body(), _grant_view(), fixture, Track-2 v2 role-scoped content HTTP surface (AUTH-INH Phase 6, plan §5.5). DB-… (+24 more)

### Community 190 - "test_geometry_fetch.py"
Cohesion: 0.09
Nodes (31): next_cursor(), The cursor to request next, or None when the walk must stop. Every AEC-DM…, _external_id(), fetch_equipment_origins(), fetch_levels(), _fetch_native_id_map(), fetch_room_geometry(), _instance_filter() (+23 more)

### Community 191 - "model_discovery.py"
Cohesion: 0.09
Nodes (34): _all_target_categories(), _authenticate(), count_categories(), format_report(), _list_rvts_async(), main(), ModelHit, rank_canonical() (+26 more)

### Community 192 - "nl_filter_harness.py"
Cohesion: 0.08
Nodes (31): Case, case_from_obj(), CaseRun, _cell_value(), fixture_column_values(), fixture_columns(), fixture_unique_ids(), format_report() (+23 more)

### Community 193 - "test_assistant_conversations_endpoint.py"
Cohesion: 0.10
Nodes (23): _async_const(), _auth(), _client(), Phase 4c Slice 1: /assistant/conversations endpoints + chat persistence wiring.…, _generate_title (invoked by _persist_turn for a brand-new conversation)…, _generate_title's except block previously only logged a warning and returned…, When a write tool triggers a pause, run_agent_turn yields an approval-request…, _run_chat() (+15 more)

### Community 194 - "test_pane_pairing_endpoints.py"
Cohesion: 0.10
Nodes (36): _authed_client(), _FakeClient, _FakeRequest, _pair(), _plant_web_session(), _proxy_env(), Phase 15a -- pane pairing HTTP surface (/auth/pane/*) + the X-Pane-Session…, Even a VALID pane token must not resolve while the flag is off. (+28 more)

### Community 195 - "test_pdp_containment.py"
Cohesion: 0.10
Nodes (31): _auth(), _bg_sid(), _client(), _FakeStore, _gate(), _identity(), _jobs(), _probe_spy() (+23 more)

### Community 196 - "test_seed_planner.py"
Cohesion: 0.14
Nodes (37): Assignment, EffectiveAccess, _matches(), Principal, One raw permission fact imported from Autodesk, attached to a single resource…, The reader whose effective access we are computing. A pure Track-2 (no-license)…, The result of the seed-time aggregation: the effective ``level`` plus the…, Aggregate raw Autodesk assignments into one effective level *and* its governing… (+29 more)

### Community 197 - "test_effective_access.py"
Cohesion: 0.13
Nodes (38): compute_effective_access(), evaluate_access(), datetime, timedelta, The effective level for ``principal`` (thin wrapper over…, Return the ALLOW/DENY decision for a stored projection record — fail closed…, Principal, ProjectionRecord (+30 more)

### Community 198 - "share_authority.py"
Cohesion: 0.08
Nodes (35): _lookup(), _binding_hub(), _coerce_firm_id(), _indexed_hub_id(), _no_autoflush(), _own_reach_blocks_share(), _lookup(), _owner_reaches() (+27 more)

### Community 199 - "digest.py"
Cohesion: 0.09
Nodes (35): build_digest_payload(), get_or_build_digest(), _last_indexed(), datetime, Phase 4d Lever 4 (Proactive Surfacing): per-model digest. A digest is a brief,…, Return the digest for the current model version, generating it lazily on the…, Run the QA health rules over the whole model via the shared serve path. Returns…, Assemble the digest dict from already-fetched facts. `categories` is the… (+27 more)

### Community 200 - "onboarding_router.py"
Cohesion: 0.11
Nodes (37): default_resolver(), All TXT strings at ``name``; ``[]`` when the name or record does not exist;…, TxtResolver, _client_ip(), DnsInstruction, _map(), MeOut, onboarding_get() (+29 more)

### Community 201 - "firm_onboarding.py"
Cohesion: 0.12
Nodes (38): _apply_challenge(), _audit(), get_open_request(), _now(), onboarding_enabled(), OnboardingConflict, OnboardingDisabled, OnboardingInvalid (+30 more)

### Community 202 - "test_issues_join_probe.py"
Cohesion: 0.09
Nodes (28): extract_pushpin_targets(), Pull every identity candidate a pushpin carries, tagged by source field.…, _bind_probe_modules(), _FakeDB, _FakeQuery, _OwnersQuery, _pushpin_issue(), fixture (+20 more)

### Community 203 - "membership.py"
Cohesion: 0.12
Nodes (36): ordered_for_update(), Query, ``query`` locked ``FOR UPDATE`` in the given primary-key order (levels 2 and…, assert_not_last_admin(), _bootstrap_admin_if_first(), _domain_of(), get_active_firm_id(), link_user_on_login() (+28 more)

### Community 204 - "test_sync_token.py"
Cohesion: 0.05
Nodes (19): Phase 7 Revit Link sync re-enable (2026-07-16): a THIRD default-off flag,…, revit_link_sync_enabled(), Test hook: clear the in-process consumed-jti registry. Not for production use., _reset_consumed_for_tests(), _configured_secret(), fixture, parametrize, Tests for revit_link/sync_token.py - the one-time elevated Sync token. Pure-… (+11 more)

### Community 205 - "test_assistant_resume.py"
Cohesion: 0.11
Nodes (31): _clear_pending(), _client(), fixture, Phase 4b: POST /assistant/resume endpoint integration tests. Closes the 4b DoD…, SEC-NEW-1: /resume re-checks the per-firm budget before the ack model turn — an…, M-1(b): the hold is taken BEFORE the confirmed write. A firm within `amount` of…, M-1(b): a continuation that fails AFTER its hold is taken but BEFORE the stream…, Regression: /resume was missing usage_ctx so the ack model turn wasn't metered.… (+23 more)

### Community 206 - "test_acc_role_sync.py"
Cohesion: 0.14
Nodes (37): fetch_project_members(), Every member of an ACC project. GET only. ``http_client`` is the test seam (an…, _cleanup(), _client(), _firm(), _membership(), _page(), Phase 3.8 slice 3 — aec/acc_role_sync.py. Two lanes in one module by design.… (+29 more)

### Community 207 - "test_ai_context_policy_router.py"
Cohesion: 0.13
Nodes (29): AdminScope, A client admin's delegated authority within ONE firm. ``project_ids`` None =…, _audit_rows(), _client(), _config_row(), _FirmKeyedStore, Project AI context policy API (D1–D5, 2026-09-13): project-admin authority +…, Hub isolation: a firm-wide admin cannot seed a config row for a project in… (+21 more)

### Community 208 - "test_conversation_store.py"
Cohesion: 0.12
Nodes (36): append_turn(), create_conversation(), get_conversation(), list_conversations(), Phase 4c Slice 1: persistence for assistant conversations. Thin CRUD over…, Set a conversation's title (used by the post-turn Haiku auto-title). No-op if…, Recent conversations for (user, project), most-recently-updated first. Returns…, Create an empty conversation row; return its UUID id. (+28 more)

### Community 209 - "test_level_host_pattern_unit.py"
Cohesion: 0.05
Nodes (3): Shared compiled regex patterns for AEC normalization (C-Schema, WP-A5). Single…, WP-A5 (C-Schema): focused tests for the unified "Level : <name>" Host regex.…, WP-A5 (C-Schema): direct microtests for the unified "Level : <name>" Host…

### Community 210 - "qa/router.py"
Cohesion: 0.08
Nodes (37): _authz_gate_authored_read(), _authz_gate_read(), compare_qa_history(), delete_qa_override(), export_model_health(), _assemble(), _assemble(), get_qa_history() (+29 more)

### Community 211 - "test_authz_enforce_keystone.py"
Cohesion: 0.11
Nodes (34): AuthzDecisionLog, Append-only security-decision audit stream for the Authorization-Inheritance…, _change_set(), _clear_decisions(), _decision_rows(), _listed_ids(), _projection(), AUTH-INH ENFORCE keystone integration test (CKA Completion Program, Phase 18… (+26 more)

### Community 212 - "test_boot_shared_state_guard.py"
Cohesion: 0.12
Nodes (35): _check_autodesk_first_shared_state(), _check_consent_state_worker_safety(), _check_shared_state_worker_safety(), 2026-08-23 audit: shared_state's MemoryStore (rate limits, refresh locks, pane…, W6 D3 (ratified): Autodesk-first must not activate unless Redis readiness…, weekly-full-audit_2026-09-11 SEC-1A: the wizard elevated-consent state…, _clear(), _clear_af() (+27 more)

### Community 213 - "test_pane_pairing.py"
Cohesion: 0.05
Nodes (26): _memory_store(), fixture, Phase 15a -- Revit pane pairing service (aps/pane_pairing.py). Service-level…, Sign-out invalidation (hard req #3): parent session gone -> pane session dead…, Belt-and-braces: the record carries expires_at and resolve() checks it itself,…, PANE_SESSION_TTL_SECONDS is an ABSOLUTE cap from redeem, not a sliding lease --…, Disabled-path probes are counted but logged at most once per window at the…, A pane token is a bearer credential, but /auth/pane/revoke takes it from the… (+18 more)

### Community 214 - "test_last_editor_lifecycle_paths_dblane.py"
Cohesion: 0.11
Nodes (34): MembershipActionBody, patch_membership(), _audit(), Name of the constraint a Postgres IntegrityError violated, or None if unknown., _violated_constraint(), _firm_member_for_uuid(), get_my_roles(), delete (+26 more)

### Community 215 - "build_request"
Cohesion: 0.08
Nodes (34): build_request(), check_context_guard(), estimate_tokens(), _has_project_context_block(), ProjectContextPolicyViolation, Any, RuntimeError, A project-context block reached the provider boundary under a policy that… (+26 more)

### Community 216 - "nl_filter.py"
Cohesion: 0.09
Nodes (32): _build_known_values_block(), _build_system_prompt(), NLFilterRequest, NLFilterResponse, BaseModel, field_validator, Natural-language filter endpoint for BIMpossible. POST /data/nl_filter Body: {…, Clamp caller-supplied grounding to safe sizes before it reaches the prompt. (+24 more)

### Community 217 - "_Ctx"
Cohesion: 0.06
Nodes (22): AiContextPolicyLookup, NamedTuple, A resolved policy plus whether it was forced closed by a lookup FAILURE.…, _Ctx, _FakeSession, model_data permits model-data task surfaces only: the assistant broker still…, A cached wayfinding block must not survive a tightening of the policy., The one request session the assembler threads everywhere (FU4). Counts… (+14 more)

### Community 218 - "usage_logger.py"
Cohesion: 0.09
Nodes (34): _bump(), ledger_counters(), note_ledger_failure(), UUID, Per-provider-call Claude API usage recording (Phase 6 metering; model routing…, Persist one usage row. Runs as a background task — never raises., Count a swallowed ledger-side failure (record_usage, record_denial,…, Snapshot of the ledger counters plus the live queue depth. (+26 more)

### Community 219 - "firm_docs_router.py"
Cohesion: 0.13
Nodes (35): _actor_user_id(), _audit(), delete_document(), _doc_json(), grant_capability(), _hidden_draft_user_ids(), list_capabilities(), list_documents() (+27 more)

### Community 220 - "test_preflight_user_roles.py"
Cohesion: 0.12
Nodes (27): Read-only production-readiness preflight checks (W5). Entry points *…, run_checks(), Finding, main_for(), PreflightResult, Result types and the shared CLI runner for ``aec.preflight`` checks., Open a connection from ``db.session.engine``, run ``checks``, print JSON,…, check_user_roles_firm_scoped() (+19 more)

### Community 221 - "test_spatial_relationships.py"
Cohesion: 0.13
Nodes (34): classify_point_among_regions(), nearest_band(), The band a probe point belongs to. Prefers the point's own (anchored) level…, Deterministic relationship of one point to one region. Fail-closed: any missing…, Resolve a probe point against a candidate pool of regions, deterministically.…, relate_point_to_region(), _as_equipment_input(), _as_room_input() (+26 more)

### Community 222 - "bench_derivative_proxy.py"
Cohesion: 0.11
Nodes (25): _authorize(), _call(), _drain(), main(), _measure(), Any, Repeatable LOCAL benchmark harness for the derivative proxy core (PDP G1, Phase…, Consume a result the way the router's ``_relay`` does; return (bytes, time-to-… (+17 more)

### Community 223 - "test_auth_login_state.py"
Cohesion: 0.11
Nodes (28): _client(), _FakeAsyncClient, _FakeResp, happy_token_exchange(), _mints_session_cookie(), _oauth_env(), fixture, AUTH-3 (2026-07-22) — the OAuth state binding must survive real login behavior.… (+20 more)

### Community 224 - "test_derivative_proxy_gate.py"
Cohesion: 0.08
Nodes (28): _BearerReq, _call(), fixture, parametrize, Route-gate ordering for the derivative proxy (AUTH-INH #11) — the leak the…, W4 C2 (owner: view-only = visualization only): the SVF2 viewer-stream routes…, W4 C2 hardening: the bearer is resolved for the request's OWN (project_id,…, W4 C2 hardening: the proxy bearer is a viewer-stream credential; the download-… (+20 more)

### Community 225 - "test_lock_order_dblane.py"
Cohesion: 0.11
Nodes (33): _firm_of(), _no_errors(), _patch_membership(), _call(), _commit(), Barrier, UUID, _race() (+25 more)

### Community 226 - "test_w7_redaction.py"
Cohesion: 0.09
Nodes (24): Test seam: every access-cache tier (entitlements + discovery, memory + Redis)., reset_discovery_caches(), _all_text(), _assert_clean(), captured(), _Db, _fake_aps(), _fresh() (+16 more)

### Community 227 - "test_audit_remediation_p4.py"
Cohesion: 0.07
Nodes (28): _filter_visible_arch_models(), Phase 3 (plan v3 §7b.8) — 2026-08-14 audit item 1.8: the linked ARCH model is a…, ensure_warm_or_enqueue(), GA-M3 (2026-06-09 audit) — the SHARED cold-miss policy, extracted from the…, _hub_still_granted(), G2, service-identity variant: is hub_id held by ANY firm's live grant? Used…, _cleanup(), _enqueue() (+20 more)

### Community 228 - "test_qa_history_capture_purge.py"
Cohesion: 0.14
Nodes (34): maybe_record_snapshot(), purge_tombstoned_history(), The single shared capture boundary for every serving path (model-health,…, Days a lineage must stay tombstoned before its history is purged. Tombstones…, Delete this project's QA history for lineages tombstoned past the grace window.…, tombstone_purge_grace_days(), _capture_report_health(), export_coordination_report() (+26 more)

### Community 229 - "test_type_grain_rollup.py"
Cohesion: 0.12
Nodes (34): _aggregate_column(), _is_numeric(), True if every non-empty value in the list parses as float., Apply the rollup aggregate for one column across instances of a type. `force`…, Collapse instance rows into one row per (familyName, typeName)., _rollup_by_type(), _instance(), fixture (+26 more)

### Community 230 - "test_cloud_ids.py"
Cohesion: 0.12
Nodes (33): cloud_ids_from_item_tip(), cloud_path_ids(), _extension(), Open-in-Revit — pure cloud-ID resolvers (no I/O). Rebuild of the lost…, Compose `{region, projectGuid, modelGuid}` for a C4R tip, else None. None ⤢ not…, `data.attributes.extension` of an item-tip payload, or None on any shape…, `{projectGuid, modelGuid}` for a C4R cloud model's tip, else None. None means…, US" | "EMEA" | None from a Data Management URN's env segment. Works on any DM… (+25 more)

### Community 231 - "encrypt_blob"
Cohesion: 0.11
Nodes (33): mint_proxy_viewer_token(), Opaque proxy-viewer bearer token (PDP G1 defect #4, 2026-08-23; bound W4 C2,…, Wrap the caller's own sid for SDK bearer use, bound to ``(project_id,…, Recover the sid from a proxy-viewer bearer for a request addressing…, resolve_proxy_viewer_sid(), _valid_id(), _cipher(), encrypt_blob() (+25 more)

### Community 232 - "_create"
Cohesion: 0.11
Nodes (16): Read-only time-limited share links for external consultants (Wave 7 / gap #9).…, ShareLink, _create(), _create_body(), fixture, Share v2 — frozen-snapshot share links (2026-08-08). DB/app lane only. Covers…, Synthetic creator-authorized element cache content., Patch the auth/allowlist/data seams create_share_link sits on, and track… (+8 more)

### Community 233 - "revit_link/audit.py"
Cohesion: 0.09
Nodes (29): _coerce_firm_id(), finalize_edit_log(), Any, UUID, Update a write-ahead 'pending' edit_log row in place (WIZ-7, 2026-07-08 audit)…, Never let a malformed firm id poison an audit insert (the firm_id='' UUID-cast…, Redact secret-ish keys and truncate oversized strings/lists (SEC-L8)., _sanitize() (+21 more)

### Community 234 - "nl_filter_monitor.py"
Cohesion: 0.12
Nodes (33): current_pins(), _drift(), evaluate_live(), evaluate_offline(), format_line(), grounding_cap(), _hard_error_summary(), _live_evidence_age_days() (+25 more)

### Community 235 - "test_change_set_mutation_hardening.py"
Cohesion: 0.11
Nodes (31): _as(), _draft(), firm(), _in_status(), _mutations(), out_of_hub_set(), fixture, parametrize (+23 more)

### Community 236 - "test_a_grant_blocked_on_the_purges_firm_lock_fails_once_the_purge_commits"
Cohesion: 0.07
Nodes (30): _clean_rows(), grantee(), grantee_with_own_reach(), _new_firm_row(), _no_hub_cache(), owner(), fixture, Two firms that each own a project on their own hub — so each can share to the… (+22 more)

### Community 237 - "test_cross_model_join.py"
Cohesion: 0.12
Nodes (34): _equipment(), Phase 3.10a — cross_model_join characterization tests. Pure-function tests, no…, WARM-ORIGIN-DOORGAP. "no_location" means "we have no origin", which is…, Fail-safe direction, asserted explicitly because getting it backwards is…, The flag only ever explains a MISSING origin. A stale True on a row that later…, The exact lie the Behavior Contract exists to prevent: a couldn't-run case…, AC-3 perf: precomputing a room bbox and using it to pre-reject candidates must…, The engine's determinate outcomes must all have a RoomStatus. A new engine… (+26 more)

### Community 238 - "test_health_shared_state_readiness.py"
Cohesion: 0.10
Nodes (31): _fresh_store(), _health(), fixture, parametrize, Wave 2 O5: /health must not report ready while the configured shared-state…, A hung Redis answers 503 inside BIMPOSSIBLE_HEALTH_REDIS_TIMEOUT_SECONDS, not…, The bound is asyncio-level: a client whose own timeouts misbehave cannot hold…, REDIS_URL is only a connection string: with the backend unset, /health never… (+23 more)

### Community 239 - "build_native_circuit_rows"
Cohesion: 0.14
Nodes (32): Panel section suffix ("(SEC 2)") from the first non-empty candidate key,…, section_suffix(), build_native_circuit_rows(), _format_breaker_amps(), Native circuit rows from the AEC DM `Electrical Circuits` category (Wave…, Compose '20A' or '20/3P' style label., Return one row per Electrical Circuits element, joined to its panel. Args:…, _circuit() (+24 more)

### Community 240 - "UsageEvent"
Cohesion: 0.11
Nodes (31): _period_start(), Start of the budget window in UTC: the first instant of the calendar month…, cost_pdf(), _csv_safe(), firms_csv(), models_cost_rows(), projects_breakdown_rows(), projects_csv() (+23 more)

### Community 241 - "if_none_match_matches"
Cohesion: 0.10
Nodes (31): Weak ETag for a /data/relationships response (Session 3, perf-diagnostic…, _relationships_etag(), C-DerivCache D1 — shared conditional-GET helpers (utils/http_caching.py).…, test_exact_quoted_match(), test_format_etag_strong(), test_format_etag_weak(), test_matches_when_etag_value_is_itself_weak_formatted(), test_matches_within_a_comma_separated_list() (+23 more)

### Community 242 - "run_matrix.py"
Cohesion: 0.08
Nodes (29): Mode, all_node_ids(), The Wave 5 production-simulation matrix: one row per mandate item. Each row…, One mandate item and the assertions that discharge it., Every pytest node id the matrix depends on, de-duplicated, order preserved., Row, rows_by_mode(), main() (+21 more)

### Community 243 - "test_teams_crypto.py"
Cohesion: 0.09
Nodes (24): _cipher(), decrypt(), encrypt(), _fernet_key_for(), MultiFernet, Slack Assistant Gateway -- Fernet encryption for bot tokens + pairing-code…, Encrypt a raw value (bot token, pairing-code payload) for at-rest storage., Decrypt a stored value. Returns None when absent or undecryptable, so a… (+16 more)

### Community 244 - "test_relay_boundary.py"
Cohesion: 0.09
Nodes (18): _adapter_relay_methods(), _FakeRequest, _header(), _load_relay(), parametrize, Relay boundary tests (2026-08-24 weekly audit RE-1). test_phase1_safety.py…, Just enough of web.Request for handle_rpc: headers, remote, async json()., SEC-L5: the relay must never forward a method outside the allowlist. (+10 more)

### Community 245 - "test_w9_lane_f_regressions.py"
Cohesion: 0.08
Nodes (23): _counts_wiring(), _resolve(), _tripwire(), _manifest(), Wave 9 lane F regression pins (backend residuals from the closure inventory).…, Repeating one URN 10_000 times is one lookup, never 10_000 (and never a cap…, _refresh(), _refresh_wiring() (+15 more)

### Community 246 - "test_wave7_automation.py"
Cohesion: 0.07
Nodes (22): _make_share_link(), _mock_db_no_mv(), _mock_db_returns_mv(), Wave 7 — Phase 3.9 automation: pure unit tests. Covers the three user-trust…, ModelVersion present → cached_at is returned as ISO string., The element count sub-query is executed after the ModelVersion lookup., The 5,000-element gate is a cross-layer contract (frontend gate + this doc…, Simulates the frontend predicate: blocked iff fields AND count > 5k. (+14 more)

### Community 247 - "test_db_safety.py"
Cohesion: 0.11
Nodes (30): assert_safe_test_db(), db_name_from_url(), is_production_db(), Shared test-DB safety guard (Layer 2). One place that answers: *is it safe to…, Return the database name (last path segment) from a SQLAlchemy URL., True if `url` names a known production database., Raise RuntimeError if `url` names a production database. Fail-open by design:…, Resolve the database URL the TEST suite should use, and assert it is safe.… (+22 more)

### Community 248 - "client_keys.py"
Cohesion: 0.10
Nodes (30): _cipher(), decrypt_api_key(), _fernet_key_for(), get_api_key_for_firm(), Session, UUID, BYO LLM platform API key — Fernet encryption + per-firm resolution (Phase 6).…, Tagged replacement for `get_api_key_for_firm`: disambiguates the three reasons… (+22 more)

### Community 249 - "ManifestCache"
Cohesion: 0.11
Nodes (21): ManifestCache, A tiny bounded backend-side cache for manifest metadata, keyed by the SERVER-…, True while an unexpired negative memo exists for ``key``; an expired one is…, _drain(), _proxy_on(), fixture, PDP G1 (2026-08-23) — derivative proxy core: streaming relay + cache/stream…, Mock APS that yields chunk-by-chunk and records whether the connection was… (+13 more)

### Community 250 - "test_membership_gate.py"
Cohesion: 0.12
Nodes (23): MintSyncTokenRequest, _body(), _clear_flags(), _clear_revit_link_cache(), _deny_membership(), _fresh_router(), fixture, PR A (2026-08-06 tenancy triage) — /revit membership-gate denial coverage. Gap… (+15 more)

### Community 251 - "RevitLinkErrorCode"
Cohesion: 0.10
Nodes (16): Enum, str, RevitLinkErrorCode, Pane-session binding resolution for P7 remote SyncWithCentral. Shared by the…, _decode_body(), parametrize, Pipe attestation (remote-sync handshake, 2026-08-18). Two halves under test: 1.…, Patch pane-session lookup + relay; return the captured relay payload. (+8 more)

### Community 252 - "test_change_set_router_type_target.py"
Cohesion: 0.16
Nodes (32): _approved_type_set(), _as_user(), _cleanup(), _create_draft(), _drop_batch(), _firm(), _member(), parametrize (+24 more)

### Community 253 - "test_login_firm_autolink.py"
Cohesion: 0.14
Nodes (30): _cleanup(), _fake_client_factory(), _FakeResp, _firm_with_domain(), _login_then_callback(), _memberships(), _oauth_env(), Firm (+22 more)

### Community 254 - "build_plan"
Cohesion: 0.13
Nodes (13): PlannerTests, ProjectSetupInput, Pure-lane tests for the Phase 8 Project Setup Wizard no-write core. Stdlib…, _valid_input(), build_plan(), ProjectSetupInput, ProvisioningPlan, Provisioning planner for the Project Setup Wizard (§4/§11 of the build spec).… (+5 more)

### Community 255 - "test_qa_overrides.py"
Cohesion: 0.08
Nodes (24): delete_override(), load_overrides(), Any, Session, Return {rule_id: {enabled?, severity?, value?}} for the project (empty if…, Create or REPLACE the override row for (project_id, rule_id). Full-replace…, Remove the override row for (project_id, rule_id), if any — the rule reverts to…, upsert_override() (+16 more)

### Community 256 - "test_structural_framing_schedule.py"
Cohesion: 0.14
Nodes (30): assemble_structural_framing_schedule(), build_structural_framing_rows(), _framing_section_summaries(), _name_of(), Structural Framing (Beam) schedule shaping (Wave 13 — Structural). Pure-Python…, Top-level shaper: instance-grain rows + totals (framing_count + by_section…, Display name: the element's type name, falling back to 'familyName · typeName'…, First section candidate that is real. Revit's "NotDefined" Section Shape enum… (+22 more)

### Community 257 - "test_live_filter.py"
Cohesion: 0.14
Nodes (30): _leaf(), _NoMutationDb, parametrize, R5 v1 — live AECDM predicate pushdown lane (aec/live_filter.py). Covers:…, A db stand-in that fails the test if the lane tries to mutate anything. Only…, _raw(), test_fiql_and_group(), test_fiql_canonical_scheduling_fields_fall_back() (+22 more)

### Community 258 - "test_sim_artifacts_autodesk_first.py"
Cohesion: 0.10
Nodes (24): _client(), _FakeSession, layer1(), fixture, Wave 5 SIM gap — the Track-2 artifact read surface under…, Flag off: both reads serve on the firm's hub grant alone and Autodesk is never…, Flag on, hub granted, audience matched, guard serving — and still 404 when the…, Flag on: the listing narrows to the projects this user's own token can reach —… (+16 more)

### Community 259 - "test_assistant_limits.py"
Cohesion: 0.12
Nodes (25): ChatBody, _check_body_size(), _check_rate(), _assert_validation_error(), P1-gamma: ChatBody.messages must be typed (role in {user, assistant}, content:…, test_non_string_content_rejected(), test_system_role_rejected(), test_valid_messages_accepted_and_dump_round_trips() (+17 more)

### Community 260 - "DataClassification"
Cohesion: 0.11
Nodes (23): DataClassification, The sensitivity class the admin assigns per artifact — the finer switch that…, _client(), _FakeSession, _get_access(), _grant_view(), layer1(), fixture (+15 more)

### Community 261 - "_match_props"
Cohesion: 0.08
Nodes (22): is_identity_prop(), _match_props(), Map each canonical key to the model's ACTUAL property name, matched case-…, True if `name` is a known identity / stripped-variant prop, matched case-…, C-Schema golden-master (characterization) harness — Commit S0. Built BEFORE any…, Built-in 'Schedule Level' variant canonicalizes to 'Level'; identity props…, F-4: both never-expiring schema caches (property map + spec/unit map) are keyed…, Master safety net: the exact IDENTITY_PROPS set is frozen. S2's derived… (+14 more)

### Community 262 - "_rows"
Cohesion: 0.07
Nodes (23): _client(), _AdminResponse, _DuplicateResponse, flag_off(), _fresh_store(), _number_check_upstream(), _client(), fixture (+15 more)

### Community 263 - "_FakeSession"
Cohesion: 0.08
Nodes (10): _FakeIntegrityError, _FakeQuery, _FakeSavepoint, _FakeSession, Exception, Phase 4 regression tests: cache.py upsert loop transaction integrity.…, Behavioural: an IntegrityError raised inside a begin_nested() savepoint is…, Minimal session simulator tracking adds, commits, and rollbacks. (+2 more)

### Community 264 - "resolve_posture"
Cohesion: 0.09
Nodes (27): test_aps_callback_rules(), test_d6_ambiguous_posture_arms_guards(), test_d6_env_diagnostic_names_variable_and_accepted_value_without_echo(), test_posture_reason_never_echoes_an_unrecognised_value(), ApsConfigError, check_aps_config(), ConfigIssue, crypto_key_material_problems() (+19 more)

### Community 265 - "test_architectural_window_schedule.py"
Cohesion: 0.16
Nodes (28): assemble_architectural_window_schedule(), build_architectural_window_rows(), Architectural Window schedule shaping (Wave 10). Pure-Python — no…, One row per window element. Sorted by Mark (numeric if possible, then alpha).…, Count + total glazing area (width*height, m2) per window type. A window missing…, Top-level shaper: instance-grain window rows + totals (window_count + by_type).…, _window_sort_key(), _window_type_summaries() (+20 more)

### Community 266 - "test_stale_sweep_worker.py"
Cohesion: 0.10
Nodes (27): Split an over-long section on blank lines, never mid-paragraph. Returns (text,…, _split_long(), LogRecord, _capture_worker_log(), _cleanup(), _ListHandler, _naive_utc_hours_ago(), datetime (+19 more)

### Community 267 - "test_geometry_decode.py"
Cohesion: 0.14
Nodes (28): _chain_segments(), footprint_area(), _next_record_start(), parse_sab(), _points_match(), Point2D, SAB (ACIS binary) tokenizer + planar room-footprint extractor. Reverse-…, Extracts the room's bottom horizontal planar face as closed 2D polygon loops.… (+20 more)

### Community 268 - "claim_next"
Cohesion: 0.14
Nodes (29): claim_next(), has_failed_job(), mark_failed(), True iff a terminal 'failed' job exists for this (project, model, version,…, Claim the oldest claimable pending job (FIFO: oldest enqueued first), marking…, _cleanup(), db(), _enqueue() (+21 more)

### Community 269 - "test_firm_docs_routes_dblane.py"
Cohesion: 0.23
Nodes (28): FirmDocument, Pillar 2 (migration h8i9j0k1l2m3) — metadata for a firm-uploaded client…, _as(), _cleanup(), _docs_root(), _firm(), _member(), fixture (+20 more)

### Community 270 - "router"
Cohesion: 0.10
Nodes (24): _clear_caches(), _on(), _cur(), fixture, W5 P1F4 item 1 — the per-user APS content caches are bounded and never poisoned…, Unbounded was the finding: each of the four content caches carries the cap., Belt and braces: even with a readable-but-churning generation the cache is…, Stand-in autodesk-first session for ``af.content_cache_scope``. (+16 more)

### Community 271 - "_stub_live_read"
Cohesion: 0.11
Nodes (27): _post_live(), Stub auth + Phase 6 seams + the model turn so the live-read resume runs without…, POST a raw JSON body (bytes) so malformed/oversized payloads are testable — the…, Sixth call site (E): an ACTIVE-but-undecryptable firm key denies with…, Ticket seeded under the paired pane's sid; a session presenting a different sid…, Expired parent session / TTL lapse: the pop returns None -> 404. Patch the pop…, A used request_id cannot be replayed: the first resume pops the ticket, the…, The per-firm budget is re-checked BEFORE the single-use pop, so an over-budget… (+19 more)

### Community 272 - "test_pdp_g1_proxy_router.py"
Cohesion: 0.09
Nodes (20): _badge_recorder(), _project_access(), fixture, parametrize, PDP G1 (2026-08-23) — router-level pins: streaming render + viewer-token…, Stub the mint-time project-access proof; records calls, denies projects in…, _signed_in(), _Stream (+12 more)

### Community 273 - "test_usage_logger.py"
Cohesion: 0.09
Nodes (22): _delta(), _make_usage(), Phase 6 / usage metering: UsageEvent recording tests. Pure unit tests — no DB…, Cache-hit turns: input_tokens is 0, cache_read_tokens carries the cost., CQ-1A: 'the process exits with tasks queued'. A task still queued when the…, RE-4A: past the cap a task is dropped (counted + WARNING), never blocked., RE-3A: the swallow in record_usage is observable via ledger_counters()., RE-3A: budget_reservation.finalize_in_background's swallow is counted too. (+14 more)

### Community 274 - "test_acc_roles_router.py"
Cohesion: 0.15
Nodes (26): AccRoleSyncError, RuntimeError, A typed ACC role-sync failure. Subclasses ``RuntimeError`` so it lands in the…, app_client(), firm_user(), fixture, _raiser(), Phase 3.8 slice 3 — POST /data/acc/sync-roles. Build-your-own-app pattern… (+18 more)

### Community 275 - "test_assistant_thinking.py"
Cohesion: 0.15
Nodes (24): _block_to_dict(), True when the question looks complex enough to warrant extended thinking., One Anthropic SDK content block -> a JSON-safe dict; None for unknown types.…, _should_use_extended_thinking(), _Block, _collect(), _ctx(), FakeClient (+16 more)

### Community 276 - "test_authz_health_query.py"
Cohesion: 0.15
Nodes (26): health_from_counts(), fetch_projection_health(), fetch_provenance_counts(), datetime, timedelta, DB glue for projection-health observability (plan v3 §7b.9). The math lives in…, Aggregate ``permission_projection`` into a :class:`ProjectionHealth` for a…, Row counts by provenance family: ``backfill`` (membership-baseline rows,… (+18 more)

### Community 277 - "test_identity_link_login.py"
Cohesion: 0.13
Nodes (25): attach_on_login(), authproof_from_verified_claims(), identity_link_enabled(), Any, datetime, Login-time identity linking — turn a verified Autodesk id-token into an…, Dark-by-default flag for login-time identity linking (default OFF)., Build an Autodesk :class:`AuthProof` from ALREADY-VERIFIED id-token claims. The… (+17 more)

### Community 278 - "track2_content_repo.py"
Cohesion: 0.13
Nodes (25): create_grant(), get_grant(), list_candidate_grants_for_read(), list_firm_grants(), _norm(), Any, datetime, UUID (+17 more)

### Community 279 - "verify_project_item_pairing"
Cohesion: 0.14
Nodes (27): has_recent_verified_pairing(), key_pairing(), pairing_block_reason(), Session, timedelta, SEC-PDP-MODEL-INDEX-PAIRING — project↔item pairing verification for durable…, Classify WHY has_recent_verified_pairing returned False, for observability…, Foreground verification of one (project_id, item_urn) pairing. Order: durable… (+19 more)

### Community 280 - "resolve_project_rules"
Cohesion: 0.18
Nodes (26): Canonical name for `name` (identity for canonical names)., Session, REGISTRY + the project's .ids-imported rules, with project overrides applied…, resolve_project_rules(), _NoDB, Phase 11 — resolve_project_rules: the single source of truth for the effective…, Stub the two DB loaders in the resolve namespace. Returns a dict capturing the…, _rule() (+18 more)

### Community 281 - "test_spec_render.py"
Cohesion: 0.16
Nodes (27): _coverage_line(), _esc(), Any, BIMpossible — Spec Draft Renderers (Wave 4.10) Turns the structured draft from…, Render the draft as a self-contained HTML document (Word-openable)., Render the draft as Markdown for the in-app preview., render_html(), render_markdown() (+19 more)

### Community 282 - "_prod_posture"
Cohesion: 0.14
Nodes (27): _check_crypto_keys(), _check_secret_key(), _prod_posture(), AST-H1 / INFRA-M2: the at-rest ciphers derive their Fernet key from a dedicated…, Production posture, DECOUPLED from TLS termination (INFRA-M2, 2026-07-01…, SEC-H3: refuse to boot with a weak/default SECRET_KEY under prod posture.…, _clear(), AST-H1 / INFRA-M2 (2026-07-01 audit): the boot guard refuses EMPTY at-rest… (+19 more)

### Community 283 - "sync_token.py"
Cohesion: 0.12
Nodes (28): _b64decode(), _b64encode(), _burn(), mint(), _prune_locked(), Exception, revit_link/sync_token.py — one-time elevated SyncWithCentral authorization…, The token is valid but was minted for a different firm/user/document than the… (+20 more)

### Community 284 - "MemoryStore"
Cohesion: 0.08
Nodes (14): MemoryStore, In-process implementation of SharedStore. Preserves today's single-process…, _make_redis_store(), fixture, Contract test suite for SharedStore — run identically against MemoryStore and…, A second acquirer blocks while the first holds the lock., A Redis lock with a short TTL auto-expires so a crashed holder doesn't deadlock…, Return a RedisStore connected to REDIS_URL, or None if unavailable. (+6 more)

### Community 285 - "fixture"
Cohesion: 0.07
Nodes (29): fixture(), mem_backend(), _cleanup_action_logs(), captured(), Capture audit rows and count projection queries; force a decision., A share lookup with real project/firm scoping, so "exact match only" can be…, scoped_shares(), _cleanup() (+21 more)

### Community 286 - "revoke_project_share_grants"
Cohesion: 0.14
Nodes (26): Non-secret admin state-change row → account_audit_log (best-effort; never rolls…, mark_project_projection_stale(), Any, datetime, UUID, DB glue for the project-unenrollment purge (AUTH-INH plan §7b.10). No policy.…, Soft-revoke every active cross-firm share on this project that this firm is a…, Mark every non-stale projection row for this firm+project stale (never… (+18 more)

### Community 287 - "live_filter.py"
Cohesion: 0.11
Nodes (27): charge_page_or_raise(), _fetch_bounded(), filter_tree_to_fiql(), _leaf_to_fiql(), live_filter_enabled(), _log_fallback(), _max_pages(), MeterExhausted (+19 more)

### Community 288 - "derivative_cache.py"
Cohesion: 0.13
Nodes (26): _best_effort_write(), CachedBytes, CachedJSON, delete_json(), get_bytes(), get_json(), _hash_bytes(), invalidate_model() (+18 more)

### Community 289 - "FastAPI"
Cohesion: 0.10
Nodes (17): FastAPI, Any, BaseException, Shared fakes for the /data/nl_filter resolver integration (slice 5). Wires…, Patch nl_filter's collaborators; return the recorder. ``ai_policy`` is what the…, wire(), _call(), Slice 6 hardening: /data/nl_filter reuses the assistant's per-session limiter.… (+9 more)

### Community 290 - "test_native_adapter_aec9.py"
Cohesion: 0.11
Nodes (25): _client_factory(), _FakeResponse, parametrize, WriteInstanceParameterRequest, AEC-9 — relay transport hardening + honest edit-log status. _call_relay used to…, RemoteProtocolError (connection died mid-response) is neither a ConnectError…, Drive write_instance_parameter into the failure finally-block with a…, AEC-9: on TIMEOUT the write may have committed in Revit after we stopped… (+17 more)

### Community 291 - "test_auth_identity_exemptions.py"
Cohesion: 0.08
Nodes (25): _authed_client(), _clean_env(), fixture, Behavior pins for the six auth/identity EXEMPT routes (PR 1, 2026-08-06).…, The half of the exemption reason that actually carries tenancy risk: "when…, C-5: an anonymous probe must get the backend's identity — and ONLY its…, The exemption reasons that caller-identity scope is NARROWER than firm scope:…, An authenticated session can carry no Autodesk id (the APS userinfo call at… (+17 more)

### Community 292 - "test_cross_firm_share_api.py"
Cohesion: 0.11
Nodes (25): _add_domain(), P6-CLIENTMGMT-F slice 2 — owner-admin share API + grantee discovery. Pins the…, ARCH-2: ONE hub-exposure rule for a grantee. The shared-projects listing is the…, W9-INV-145 throttle: after the per-window budget the answer is a 429 whose body…, UX regression (S&L live smoke 2026-09-13): the Shared-with-you row showed the…, SEC-2 (owner ruling 2026-09-14): discovery is a lookup, not a directory. Two…, Case, surrounding whitespace and a trailing dot are the same domain…, A claimed-but-unproven domain (admin_manual or an open onboarding claim) is not… (+17 more)

### Community 293 - "test_usage_ledger_dblane.py"
Cohesion: 0.15
Nodes (21): _Block, _ctx(), _FakeClient, _FakeMessages, firm(), _msg(), fixture, Model routing slice 1B — usage ledger, DB lane. Real Postgres writes through… (+13 more)

### Community 294 - "test_xlsx_export.py"
Cohesion: 0.12
Nodes (24): _patch_cold(), _patch_token(), _fake(), _patch_warm(), Wave 5 — XLSX export: unit + endpoint contract tests. TDD order: all tests…, E3 (2026-08-08): the tenancy gate denies a project outside the firm's access →…, The canonical placeholder family must never appear in an export, mirroring the…, item_grain=type collapses instances sharing (familyName, typeName) into one… (+16 more)

### Community 295 - "test_assistant_context.py"
Cohesion: 0.13
Nodes (18): format_project_context(), Build the auto-derived project briefing paragraph from already-fetched facts.…, _cats(), _Ctx, Phase 4d Lever 2 (Better Context): the project-context grounding builder. These…, The firm-view count is scoped to ctx.firm_id, so the same user on the same…, SEC-1/CHAIN-2 (WFA 2026-09-14): the policy is keyed (firm_id, project_id). Firm…, test_build_caches_and_reuses_within_ttl() (+10 more)

### Community 296 - "record_badge_use"
Cohesion: 0.14
Nodes (25): True when the Service-Account badge alert emission is enabled (default False)., service_alert_active(), _build_row(), Any, datetime, I/O side of Service-Account (badge) log-distinctness + alerting (AUTH-INH §7b.3…, Record one Service-Account badge use and return its classification. Known job →…, Shape the ``actor_type="service"`` decision-stream row for one badge use.… (+17 more)

### Community 297 - "test_service_badge.py"
Cohesion: 0.14
Nodes (25): BadgeUseClass, classify_badge_use(), detect_anomalous_badge_volume(), _norm(), datetime, Pure core for Service-Account (badge) log-distinctness + anomalous-use…, Verdict for a single badge use. ``known`` is False for any unrecognized/blank…, Classify one Service-Account badge use. A recognized job in… (+17 more)

### Community 298 - "test_key_permissions.py"
Cohesion: 0.18
Nodes (26): encrypt_api_key(), get_api_key_for_user(), key_hint(), Encrypt a raw Anthropic API key for at-rest storage., Last 4 characters of the key — safe to store, useful for display., Look up a USER's active personal key. D-7 BOUNDARY (ratified 2026-08-04): this…, Per-USER personal API key (B-2, migration 13014695175a; ratified D-1/D-3).…, UserApiKey (+18 more)

### Community 299 - "test_membership_draft_gating.py"
Cohesion: 0.22
Nodes (26): Set a member's role inside one firm. Commits. Last-admin-guarded; audit…, set_membership_role(), _cleanup(), _firm(), _membership(), P3-8 slice 2 — draft membership reader gating (owner ruling 2026-08-27). A…, Concealment: the draft-row 404 must carry the exact detail a genuinely…, An empty/None actor sees NO draft rows — never a widened view. (+18 more)

### Community 300 - "test_model_index_discovery.py"
Cohesion: 0.12
Nodes (26): index_discovered_models(), Session, Idempotently upsert stub model_index rows for an all-rvts listing, then…, _clean_rows(), fixture, Discovery-time model_index stubs (aec.model_index_sync) — the all-rvts →…, Stubs (and only stubs) track ACC renames, and carry the epoch sentinel so they…, A lineage present in one discovery run and absent from the next (APS… (+18 more)

### Community 301 - "test_elements_etag.py"
Cohesion: 0.15
Nodes (25): _apply_sort(), _key(), _elements_etag(), _get_field_value(), Return a string value for a field from an element dict., Weak ETag for a /data/elements response (Wave 4.6.5 #3). Within a model version…, _els(), Wave 4.6.5 #3 — unit tests for the /data/elements ETag helper. The conditional-… (+17 more)

### Community 302 - "test_entrypoint_firm_docs.py"
Cohesion: 0.12
Nodes (25): requires_root, requires_sh, _code_lines(), Tests for the firm-docs volume-prep entrypoint scripts. Two layers: *…, Ordinary startup must not `chown -R` the whole firm-docs corpus., The bounded recursive repair is opt-in and operator-run, not on boot., A root that cannot be created (parent is a regular file) must abort with a…, As root: the configured owner is applied to the root, and pre-existing children… (+17 more)

### Community 303 - "test_change_set_list_and_discard.py"
Cohesion: 0.15
Nodes (25): _as_user(), _cleanup(), _draft(), _firm(), firm_user(), _member(), fixture, parametrize (+17 more)

### Community 304 - "test_personal_assistant_endpoint.py"
Cohesion: 0.13
Nodes (25): _client(), Model routing slice 4 — /assistant/personal router, fastapi lane. Run with…, Flag-off must look identical to anonymous and signed-in callers: the identity…, UsageEvent stand-in carrying only the columns the wire mapper reads., Anonymous callers get the identity denial, never a 422 that reveals the…, Slice 6: the scope gate is the first check after identity, so a forger cannot…, _Row, test_create_conversation_rejects_firm_scope_body() (+17 more)

### Community 305 - "test_qa_migrations_idempotent.py"
Cohesion: 0.17
Nodes (26): _load(), parametrize, TST-3 — the new table-creating migrations are idempotent. Each guards…, The two gateways land in sequence, not as two alembic heads. A branched…, Invoke upgrade() with a mocked op + inspector reporting the given CHECK-…, Invoke upgrade() with a mocked op + inspector reporting the given DB state., Each table is guarded independently, so a half-built DB completes rather than…, _run_ck_upgrade() (+18 more)

### Community 306 - "_FakeAdminResponse"
Cohesion: 0.10
Nodes (17): _FakeAdminResponse, get(), AUTH-INH §7b.3 #4: the onboarding account:read badge is recorded as a distinct…, Bootstrap preserved: single-tenant + zero grants keeps the prior global-…, RA-1 allow arm through the router: multi-tenant + the firm HOLDS the hub grant…, test_acc_templates_allows_granted_hub_when_multi_tenant(), get(), test_acc_templates_allows_hub_granted_to_firm() (+9 more)

### Community 307 - "test_artifacts_provenance.py"
Cohesion: 0.14
Nodes (18): _is_genuine_source(), Session, Server-side provenance validation for Track-2 published-artifact source sets…, Raised when one or more declared sources fail server-side provenance…, True iff ``item_urn`` is a lineage item known to the server for exactly this…, Return the canonical, deduplicated, sorted list of validated source item-URNs…, SourceProvenanceError, validate_source_provenance() (+10 more)

### Community 308 - "test_authz_reconcile.py"
Cohesion: 0.12
Nodes (18): past_sla(), Any, datetime, timedelta, Freshness reconciliation for the permission projection (plan v3 §7a.3 / §7b.9).…, True if a row synced at ``synced_at`` has aged past ``window`` as of ``now``. A…, Flip every CURRENT projection row older than the window to ``stale``; return…, Return up to ``limit`` ``(firm_id, project_id)`` pairs whose freshest row is… (+10 more)

### Community 309 - "compute_cost"
Cohesion: 0.15
Nodes (22): compute_cost(), PricingNotFoundError, LookupError, Session, DB-backed, reproducible cost computation. INVARIANT: never returns a silent $0…, No model_pricing row matched the requested model + date., resolve_pricing(), date (+14 more)

### Community 310 - "help_library.py"
Cohesion: 0.13
Nodes (22): _build_index(), _current_fingerprint(), _get_index(), HelpDoc, _Index, load_help_docs(), Loads the how-to help library (markdown docs in ./help) into a single text…, Every *.md's (name, mtime_ns, size) in help_dir, as a hashable/comparable tuple. (+14 more)

### Community 311 - "test_lighting_fixture_schedule.py"
Cohesion: 0.17
Nodes (24): assemble_lighting_fixture_schedule(), build_fixture_rows(), _lighting_voltage_summaries(), Lighting-fixture-schedule shaping (Wave 4.8). Pure-Python — no fastapi/DB/AEC-…, Fixture count + total connected load (W) per Voltage. Per-type watts is the SUM…, Top-level shaper: type-grain rows + totals. Caller pre-filters to Lighting…, Group Lighting Fixtures instances by Type Mark; one row per type. Type-level…, _fix() (+16 more)

### Community 312 - "param_aliases.py"
Cohesion: 0.10
Nodes (22): AliasConflictError, AliasError, _build_registry(), family_name_prefix(), FirmAliasRule, MalformedAliasError, ValueError, _r() (+14 more)

### Community 313 - "ProjectConfig"
Cohesion: 0.14
Nodes (22): get_assistant_mode(), Return the assistant mode for *project_id*. 'none' → block with 403 'help_only'…, ProjectConfig, Per-project assistant access tier (Phase 6 / access billing). assistant_mode…, _client(), Phase 6 / access tiers: project_configs + assistant mode routing tests. Pure…, Stub all auth + Phase 6 gateway seams so each test focuses on one concern., help_only mode must pass HELP_ONLY_TOOLS (just search_help) to run_agent_turn. (+14 more)

### Community 314 - "manifest.template.json"
Cohesion: 0.08
Nodes (25): identity, messageTeamMembers, REPLACE_WITH_YOUR_HOST, accentColor, bots, description, full, short (+17 more)

### Community 315 - "TestRelayFrameGuard"
Cohesion: 0.13
Nodes (10): _BufferPipe, _HeaderOnlyPipe, relay._check_auth() must enforce X-Relay-Token., relay._read_frame() must reject corrupt length prefixes. RevitLink framing…, A 4-byte signed-int32 LE length prefix, exactly as the C# side writes., Serves exactly the 4-byte header, then fails if asked for more — so a body read…, Serves a full preset buffer (header + body) sequentially via .read(n)., Guard against a careless '<i' -> '<I' swap. The C# writer emits a signed Int32,… (+2 more)

### Community 316 - "test_autodesk_first_d1b_revert_gate.py"
Cohesion: 0.16
Nodes (25): _client(), parametrize, TestClient, W6 D1b: the assistant ``parameter-writes/{id}/revert(-preview)`` routes under…, Flag off: membership + role only, straight to the proposal lookup. project_id…, W9-INV-088: one cold Layer-1 evaluation per request; the D1 capability re-read…, Entitlement is a ceiling, never a grant: with Autodesk saying yes, a firm-side…, Firm side allows; the caller's own Autodesk access to the project is gone ->… (+17 more)

### Community 317 - "parametrize"
Cohesion: 0.12
Nodes (24): _assert_no_secrets(), _bind_project_hub(), _boom(), project_hub_binding(), parametrize, BIMpossible's own verified project->hub binding for _P (the chat gates are…, W6 D1b: Autodesk says yes, membership + capability hold for the Autodesk-proven…, The D1 violation itself: Autodesk confirms the user (and the Layer-1 check… (+16 more)

### Community 318 - "test_get_user_token_refresh.py"
Cohesion: 0.18
Nodes (21): _auth(), _cleanup(), _creds(), _error_client(), _ExplodingClient, _ok_client(), fixture, parametrize (+13 more)

### Community 319 - "test_nl_filter_ai_context_policy.py"
Cohesion: 0.14
Nodes (18): _assert_nothing_spent(), _call(), _FirmKeyedSession, BaseException, parametrize, POST /data/nl_filter under the project AI context policy (owner ruling on #661…, SLOP-1 (WFA 2026-09-14): a policy-store failure is STILL denied before any…, SEC-1: the policy is keyed (firm_id, project_id). A caller passing… (+10 more)

### Community 320 - "ProjectAiContextPolicy"
Cohesion: 0.15
Nodes (24): Server-side inverse of the wayfinding block: the ModelChoice a handle names, or…, resolve_navigation_handle(), ProjectAiContextPolicy, Per-(firm, project) AI context policy (D1/D2 2026-09-13; firm-scoped SEC-1,…, _authz_off_and_secret(), _ctx(), _nav(), fixture (+16 more)

### Community 321 - "test_pairing_block_metric.py"
Cohesion: 0.16
Nodes (20): PairingVerificationError, Exception, Background durable write refused: no recent foreground-verified pairing.…, _blocked_lines(), _cleanup(), _enqueue(), _job_row(), _pairing_error() (+12 more)

### Community 322 - "run_model_health"
Cohesion: 0.18
Nodes (24): detect_discipline(), Infer a model's dominant discipline from the categories present in `elements`.…, Run the QA rules over a model's elements and return a health report.…, run_model_health(), _alias_rule(), _el(), _electrical_model(), Phase 11 — discipline-aware model-health + electrical rule set (pure unit… (+16 more)

### Community 323 - "build_structural_column_rows"
Cohesion: 0.19
Nodes (23): assemble_structural_column_schedule(), build_structural_column_rows(), _name_of(), Structural Column schedule shaping (Wave 13 — Structural). Pure-Python — no…, First section candidate that is real; skips Revit's NotDefined sentinel., One row per column element, sorted by name (case-insensitive). elevation_m is…, _section_of(), _col() (+15 more)

### Community 324 - "_login"
Cohesion: 0.25
Nodes (25): _blocked(), _enqueue(), _fetch_spy(), _job(), _login(), _process(), A real server-side session for a fresh Autodesk user. Returns (user, sid,…, W5 P1F item 7: the user reaches the project but not the model's folder. In… (+17 more)

### Community 325 - "test_help_wave4_discoverability.py"
Cohesion: 0.15
Nodes (23): Discoverability tests for the Wave 4 long-tail help articles. Each new article…, test_account_usage_identifier_style(), test_account_usage_natural_language(), test_calculated_fields_identifier_style(), test_calculated_fields_natural_language(), test_element_details_identifier_style(), test_element_details_natural_language(), test_element_groups_identifier_style() (+15 more)

### Community 326 - "TestMigrationFile"
Cohesion: 0.08
Nodes (9): Phase 3.5 schema migration regression tests. Validates source-level evidence…, Migration SQL must exist, drop NOT NULL, add CHECK, create 3 indexes., ORM `category_key` must be declared nullable for kind='group' rows., ORM must mirror the DB-side per-kind CHECK constraint by name + expression., Three partial-unique-indexes for groups must be declared on the ORM., TestMigrationFile, TestOrmGroupUniquenessIndexes, TestOrmNullability (+1 more)

### Community 327 - "build_architectural_door_rows"
Cohesion: 0.19
Nodes (22): assemble_architectural_door_schedule(), build_architectural_door_rows(), _door_sort_key(), Architectural Door schedule shaping (Wave 10). Pure-Python — no fastapi/DB/AEC-…, One row per door element. Sorted by Mark (numeric if possible, then alpha).…, Top-level shaper: instance-grain door rows + totals (door_count + by_type)., _el(), Pure-core tests for the Wave 10 Architectural Door schedule shaper. (+14 more)

### Community 328 - "test_architectural_room_finish_schedule.py"
Cohesion: 0.19
Nodes (22): assemble_architectural_room_finish_schedule(), build_architectural_room_finish_rows(), Architectural Room Finish schedule shaping (Wave 10). Pure-Python — no…, One row per Room element. Sorted by Room Number (alpha-numeric) then Name. All…, Top-level shaper: instance-grain room rows + totals., _el(), Pure-core tests for the Wave 10 Architectural Room Finish schedule shaper. No…, _num_from tolerates unit-suffixed values like '2.74 m'. (+14 more)

### Community 329 - "test_ops_metrics.py"
Cohesion: 0.15
Nodes (21): ProjectionHealth, assemble_ops_metrics(), is_stale_deny_reason(), datetime, timedelta, Authorization-Inheritance operational metrics (plan v3 §7b.9) — the pure…, Assemble scalar counts (from the query layer) into the immutable ops snapshot.…, True when a decision-stream reason denotes a freshness/availability denial (not… (+13 more)

### Community 330 - "build_purge_report"
Cohesion: 0.14
Nodes (21): build_purge_report(), PurgeCounts, PurgeReport, PurgeSubsystem, Enum, str, Project-unenrollment purge — the data-lifecycle offboarding seam (AUTH-INH plan…, Assemble a :class:`PurgeReport` from the four wired subsystem row counts. Pure:… (+13 more)

### Community 331 - "build_mechanical_equipment_rows"
Cohesion: 0.22
Nodes (22): assemble_mechanical_equipment_schedule(), build_mechanical_equipment_rows(), _mark_sort_key(), _el(), test_cooling_capacity_watts(), test_empty_returns_empty(), test_heating_capacity_watts(), test_instance_grain_all_returned() (+14 more)

### Community 332 - "test_nav_handle.py"
Cohesion: 0.16
Nodes (22): _b64e(), mint_handle(), nav_handle_secret(), _payload(), Opaque navigation handles for the Assistant's project_navigation context…, Return the one candidate ``item_id`` the handle was minted for, or ``None``.…, HMAC key for navigation handles. Empty → the caller MUST fail closed., Mint a handle for ``item_id`` bound to (user, firm, project). Raises… (+14 more)

### Community 333 - "build_structural_foundation_rows"
Cohesion: 0.20
Nodes (22): Top-level shaper: instance-grain rows + totals. Caller pre-filters to category…, assemble_structural_foundation_schedule(), build_structural_foundation_rows(), _name_of(), Structural Foundation schedule shaping (Wave 13 — Structural). Pure-Python — no…, One row per foundation element, sorted by name (case-insensitive). Dimensional…, _footing(), Wave 13 — Structural Foundation schedule shaper unit tests. Instance-grain (one… (+14 more)

### Community 334 - "is_suppressed_element"
Cohesion: 0.14
Nodes (20): is_suppressed_element(), Element suppression — elements that must never surface anywhere in the product.…, True if an element's name / family / type carries a suppression marker. Each…, Pure-lane tests for aec/suppression.py. `is_suppressed_element` is the single…, test_case_insensitive_lowercase_marker(), test_case_insensitive_mixed_case_marker(), test_empty_dict_returns_false(), test_empty_strings_return_false() (+12 more)

### Community 335 - "_Session"
Cohesion: 0.19
Nodes (21): _clear_firm_default(), create_view(), delete_view(), _get_active_view(), list_views(), BaseModel, delete, get (+13 more)

### Community 336 - "test_change_set_separate_approver_flag.py"
Cohesion: 0.20
Nodes (23): ChangeSetStatusHistory, Append-only status-transition log for ChangeSet (Audit & History Pattern §4…, _approve_rows(), _as(), firm_with_two_members(), _in_review(), fixture, parametrize (+15 more)

### Community 337 - "test_editor_recovery_cli.py"
Cohesion: 0.12
Nodes (18): _argv(), parametrize, W9 lane C — ``aec.editor_recovery`` CLI surface, pure lane (no DB). Pins…, The operator follows the repo's documented ``on`` spelling and must get the…, test_actor_column_carries_the_operator_hash(), test_arm_accepts_every_documented_affirmative(), test_arm_stays_off_for_negatives_blank_and_malformed(), test_audit_detail_carries_operator_hash_never_the_raw_operator() (+10 more)

### Community 338 - "test_groups_views_hub_isolation.py"
Cohesion: 0.18
Nodes (23): _assert_enroll_denied(), _assert_foreign_group_hidden(), _assert_hub_denied(), _group_body(), own_group(), SEC-GROUPS-VIEWS-HUB-ISOLATION (2026-08-07) — /data/groups + /data/views route-…, A personal group row in the caller's own firm, created directly so the…, _seed() (+15 more)

### Community 339 - "seed_world"
Cohesion: 0.25
Nodes (22): _audits(), W5 ROLES — migration aadf3ce41b1c (user_roles primary key -> (user_uuid,…, lock_timeout: a live transaction holding user_roles makes backend-migrate fail…, test_composite_key_in_the_wrong_column_order_is_not_accepted(), test_downgrade_refuses_multi_firm_users_then_restores_and_re_upgrades(), test_second_upgrade_is_a_no_op(), test_unexpected_primary_key_shape_stops_the_migration(), test_upgrade_from_previous_head_cleans_stale_rows_with_audit_and_scopes_the_key() (+14 more)

### Community 340 - "test_teams_pairing_store.py"
Cohesion: 0.08
Nodes (11): _memory_store(), fixture, Microsoft Teams Assistant Gateway -- pairing mechanics that don't touch the DB…, THE bug this function exists to prevent: a reply inside a channel thread…, Callers must treat "" as 'cannot bind', never as a wildcard that would let one…, An activity with no tenant cannot be scoped to a firm at all; the router must…, Both gateways use the same shared store. A Teams consent state must not be…, test_conversation_key_is_empty_when_nothing_usable_is_present() (+3 more)

### Community 341 - "ai_context_policy_router.py"
Cohesion: 0.15
Nodes (22): AiContextPolicyBody, AiContextPolicyOut, _audit(), _firm_row(), get_project_ai_context_policy(), _policy_of(), ProjectPolicyActor, BaseModel (+14 more)

### Community 342 - "build_architectural_wall_type_rows"
Cohesion: 0.20
Nodes (21): assemble_architectural_wall_type_schedule(), build_architectural_wall_type_rows(), Architectural Wall Type schedule shaping (Wave 10). Pure-Python — no…, Group wall instances by type; one row per type with count. Type-level columns…, Top-level shaper: type-grain wall rows + totals., _wall_type_name(), _el(), Pure-core tests for the Wave 10 Architectural Wall Type schedule shaper. (+13 more)

### Community 343 - "get_current_sid"
Cohesion: 0.11
Nodes (19): _principal_is_session_id(), Is this principal the ambient *session* id rather than an Autodesk user id?…, get_current_sid(), The current request's session id (or None outside a request). OD2 Phase 4.2:…, _patch_user_gate(), _scope(), W5 P1F item 7: a job that reads one item (a prewarm fill, possibly with the app…, test_user_actor_entitled_runs_bound_to_its_own_sid_then_unbinds() (+11 more)

### Community 344 - "discipline_field_probe.py"
Cohesion: 0.14
Nodes (22): _b(), Column, ColumnResult, _d(), _e(), _f(), _fa(), match_column() (+14 more)

### Community 345 - "identity.py"
Cohesion: 0.11
Nodes (17): is_active_member_of_firm(), Session, UUID, Firm-membership authorization for the chat gateways (issue #291). The gateways…, True iff `user_uuid` names a user with an ACTIVE membership in `firm_id`.…, _dynamic_firm_id(), grant_firm_view_editor(), UUID (+9 more)

### Community 346 - "test_help_corpus_guard.py"
Cohesion: 0.15
Nodes (21): _parse_frontmatter(), Split a leading `---` frontmatter block. Returns (meta, body). Parses simple…, _corpus_last_verified(), CI corpus-boundary guard for the client help library (backend/aec/help/*.md).…, Violations across every *.md in help_dir., Map of help filename -> parsed last_verified date for every article., All corpus-boundary violations in one help article. Empty list = clean., test_guard_allows_clean_client_language() (+13 more)

### Community 347 - "rollout_diagnostics.py"
Cohesion: 0.19
Nodes (22): aps_content_cache_posture(), _backend_of(), build_report(), cache_posture(), _classify(), flag_posture(), _fmt_ms(), _fmt_rate() (+14 more)

### Community 348 - "has_spec_library"
Cohesion: 0.08
Nodes (23): available_sections(), has_spec_library(), True if a clause library exists for this category (drives the FE button)., List the section numbers that currently have a clause library on disk., test_available_sections_includes_batch2(), test_available_sections_includes_batch3(), test_available_sections_includes_batch4(), test_available_sections_includes_batch5() (+15 more)

### Community 349 - "test_cfgb_posture_and_aps_boot.py"
Cohesion: 0.21
Nodes (21): _check_aps_config(), W5 CFG-B: APS OAuth config (APS_CLIENT_ID / APS_CLIENT_SECRET /…, _d6_guards_armed(), _full_aps(), _posture(), parametrize, W5 CFG-B — boot-time posture parity, APS startup config check, /auth/login…, D6 rule, spelled out independently of the resolver. (+13 more)

### Community 350 - "test_2legged_token.py"
Cohesion: 0.16
Nodes (18): _auth(), _counting_client(), _error_client(), _ExplodingClient, _isolate(), Validates cached 2-legged APS app tokens used by constrained service-identity…, A token POST whose response raises HTTPStatusError(status), built off the SUT's…, Two callers race the SAME cold scope: the double-checked lock must let exactly… (+10 more)

### Community 351 - "_StubDb"
Cohesion: 0.11
Nodes (16): cache(), _Clock, Only what the module touches: ``get(ProjectHubCache, project_id)``., _StubDb, test_401_evicts_the_whole_user_token_set_and_reraises(), _body(), test_403_evicts_exactly_that_project(), _body() (+8 more)

### Community 352 - "TestNamedDeliverableOrmExposure"
Cohesion: 0.09
Nodes (7): Audit P1-1 regression tests: Phase 3.4.2 ORM exposure + create_view invariant.…, The post-audit cleanup migration must exist and be scoped to smoke rows., The six Phase 3.4.2 columns must be declared on the ORM., Backend create_view must populate `categories[]` from `category_key`., TestCategoriesBackfillMigration, TestCreateViewCategoriesInvariant, TestNamedDeliverableOrmExposure

### Community 353 - "test_pairing_gate.py"
Cohesion: 0.12
Nodes (18): _cleanup_mv(), _mv_count(), parametrize, SEC-PDP-MODEL-INDEX-PAIRING — the project↔item pairing gate (aec/pairing.py).…, relationships_fetch swallows plain RuntimeError per category; the pairing…, index_discovered_models is exempt from pairing verification ONLY because its…, _src(), test_background_without_evidence_raises_before_fetch_and_persists_nothing() (+10 more)

### Community 354 - "test_pdp_g1_proxy_tenancy.py"
Cohesion: 0.15
Nodes (19): _all_kinds(), _never_probe(), PDP G1 (2026-08-23) — derivative proxy under the REAL tenancy gate (no…, Two projects in two hubs, each with one model. The caller's firm (static test…, _set_scope(), test_authorized_caller_gets_own_model_manifest_derivative_thumbnail(), test_download_share_serves_bytes_and_narrowing_stops_them_even_when_cached(), test_every_denial_is_the_identical_bare_404() (+11 more)

### Community 356 - "test_interiors_furniture_schedule.py"
Cohesion: 0.20
Nodes (21): assemble_interiors_furniture_schedule(), build_interiors_furniture_rows(), _furniture_sort_key(), One row per furniture element. Sorted by Mark (numeric if possible, then…, Top-level shaper: instance-grain furniture rows + totals (furniture_count +…, _el(), Pure-core tests for the Wave 16 Interiors Furniture schedule shaper., test_assemble_by_type_falls_back_to_name_then_placeholder() (+13 more)

### Community 357 - "build_plumbing_fixture_rows"
Cohesion: 0.24
Nodes (21): assemble_plumbing_fixture_schedule(), build_plumbing_fixture_rows(), Type-grain: one row per family/type with count, sorted by name., _el(), test_conn_size_is_raw_metre_range(), test_conn_size_none_when_absent(), test_cwfu_key(), test_cwfu_zero_not_none() (+13 more)

### Community 358 - "test_schedule_endpoints_preparing.py"
Cohesion: 0.23
Nodes (21): get_electrical_equipment_schedule(), Instance-grain electrical equipment schedule for the model's Electrical…, _call_circuits(), _call_element_by_uid(), _call_endpoint(), _call_lighting(), _job_count(), GA-H5 (2026-06-09 audit) — the relationship-pool endpoints must not run the… (+13 more)

### Community 359 - "favorites_router.py"
Cohesion: 0.14
Nodes (19): Per-user pinned projects/models (personal preference, never shared with the…, UserFavorite, _actor_user_id(), delete_favorite(), FavoriteIn, list_favorites(), put_favorite(), BaseModel (+11 more)

### Community 360 - "test_gql_client.py"
Cohesion: 0.16
Nodes (17): _FakeResp, fixture, Wave 4.6.5 Session 3 — pooled httpx client + transport-error mapping (_gql).…, Stub .post to walk `items` (each a _FakeResp or an Exception to raise); the…, real_httpx(), _seq_post(), _stub_post(), test_connect_error_mapped_to_network() (+9 more)

### Community 361 - "test_shared_parameters_registry.py"
Cohesion: 0.10
Nodes (12): guids(), fixture, Integrity + round-trip tests for the canonical shared-parameter registry.…, --check (generate(check_only=True)) must itself catch the committed seed JSON…, Same drift class as above, for the committed Revit .txt artifact., Confirmed-real bug: pointing SPF_PATH/SEED_PATH at paths that exist nowhere on…, registry(), test_check_only_detects_missing_artifact_files_on_disk() (+4 more)

### Community 362 - "test_reclaim.py"
Cohesion: 0.16
Nodes (19): _cleanup(), _make_job(), RE-1 (2026-07-06 audit) — periodic reclaim of ProvisioningJob rows stuck at…, A job that entered 'provisioning' moments ago is legitimately in-flight and…, A job stuck 'provisioning' past the threshold (its owning process was killed)…, Only 'provisioning' rows are ever touched — planning/complete/failed/…, test_reclaim_fails_stale_provisioning_job_and_records_history(), test_reclaim_ignores_other_statuses_no_matter_how_old() (+11 more)

### Community 363 - "EditLog"
Cohesion: 0.20
Nodes (20): Audit trail lookup for revit_link parameter writes (Phase 7 audit-gate). Read-…, tool_query_edit_log(), EditLog, Append-only log of every write_instance_parameter attempt. References…, _ctx(), fixture, DB-lane test for the query_edit_log assistant tool — real EditLog rows via the…, A caller with no firm identity (ctx.firm_id is None) must see nothing — fail… (+12 more)

### Community 364 - "fetch_ops_metrics"
Cohesion: 0.17
Nodes (17): AuthzOpsMetrics, fetch_ops_metrics(), datetime, timedelta, DB glue for the Authorization-Inheritance ops-metrics view (plan v3 §7b.9). The…, Aggregate the decision stream + break-glass table into an…, Point-in-time operational snapshot for the founder/admin authz ops view., Overall green: projection healthy AND no staleness denials AND no badge… (+9 more)

### Community 365 - "test_explore_allowlist.py"
Cohesion: 0.13
Nodes (16): probe_model_categories(), {category: set(exposed param names)} for one model, via the proven Data-tab…, _EmptyFirmHubsDB, _EmptyHubsQuery, _fixed_firm(), real_hub_tenancy, ASST-1 / ASST-3 (2026-06-10 audit) — the diagnostics paths must enforce…, PLAT-9: the operator CLI now gates on firm↔hub tenancy. A project whose hub… (+8 more)

### Community 366 - "test_security_batch_b.py"
Cohesion: 0.12
Nodes (20): get_schema(), get_type(), get, Returns all top-level query fields with their argument signatures., Returns fields of a specific GraphQL type., _require_diag_auth(), _type_str(), _phase6_hub_gate_bypass() (+12 more)

### Community 367 - "build_fire_protection_sprinkler_rows"
Cohesion: 0.24
Nodes (19): assemble_fire_protection_sprinkler_schedule(), build_fire_protection_sprinkler_rows(), Type-grain: one row per family/type with count, sorted by sprinkler type., _el(), test_empty_returns_empty(), test_k_factor(), test_missing_params_returns_empty(), test_multiple_types_deduplicated() (+11 more)

### Community 368 - "build_mechanical_air_terminal_rows"
Cohesion: 0.25
Nodes (20): assemble_mechanical_air_terminal_schedule(), build_mechanical_air_terminal_rows(), Type-grain: one row per family/type with count, sorted by type mark., _el(), test_cfm_fallback_flow(), test_cfm_fallback_supply_air_flow(), test_cfm_key_primary(), test_empty_returns_empty() (+12 more)

### Community 369 - "test_revit_context_injection.py"
Cohesion: 0.18
Nodes (19): parse_revit_context(), Typed parse of the pane's `revit_context` value. None on anything that is not a…, One system-block string. The payload is a JSON literal, so every user-authored…, render_revit_context(), _payload(), Phase 15c — typed Revit pane context injection. Pins: - the pane's…, _revit_block(), test_all_garbage_yields_no_block() (+11 more)

### Community 370 - "Registry"
Cohesion: 0.17
Nodes (15): load_registry(), Load every ``*.toml`` (except the lock) in ``registry_dir`` into a Registry., ParamGroup, Typed model for the BIMpossible canonical shared-parameter registry. Stdlib-…, True when this param feeds the push pipeline's field map., A GROUP in the Revit SPF (id -> name), one per discipline domain., The whole canonical set: the group table plus every parameter., One canonical BIMpossible shared parameter. ``key`` is the immutable identity… (+7 more)

### Community 371 - "test_admin_router_audit_edits.py"
Cohesion: 0.26
Nodes (19): _make_client(), _make_edit_log_row(), _mock_db_with_rows(), Phase 7 audit-gate: read-only admin visibility into edit_log. GET…, A MagicMock Session whose query(EditLog).filter(...).order_by(...)…, test_export_edits_rejects_unknown_format(), test_export_edits_xlsx_body_is_valid_workbook(), test_export_edits_xlsx_requires_admin_auth() (+11 more)

### Community 372 - "test_authz_telemetry.py"
Cohesion: 0.12
Nodes (15): _ev(), _fresh_registry(), fixture, parametrize, W7.1a — aec.authz_telemetry registry + decision events (pure lane). Pins: the…, test_counts_rates_and_by_reason_keys(), test_denial_ring_is_bounded_and_ignores_allows(), test_latency_percentiles_nearest_rank() (+7 more)

### Community 373 - "test_change_set_separate_approver_d2.py"
Cohesion: 0.22
Nodes (19): _as(), _cs(), _history(), _in_review(), fixture, parametrize, D2 (Wave 6): ratified separate-approver policy — non-race API truth table.…, Firm A (author + reviewer) and firm B (an active member of B only). (+11 more)

### Community 374 - "test_grant_refused_on_inactive_firm.py"
Cohesion: 0.14
Nodes (17): client(), _grant_editor(), fixture, parametrize, Wave 4 scenarios, Part 1 — grant writers refuse when the caller's firm is not…, Lock order is firm -> memberships on both sides. A grant writer holds the firm…, A first login's bootstrap locks the firm's active memberships, then its INSERT…, _set_status() (+9 more)

### Community 375 - "test_wizard_consent_identity.py"
Cohesion: 0.10
Nodes (14): _consent_env(), _FakeAsyncClient, _FakeResponse, SEC-WIZ-CONSENT-1 (2026-07-27 weekly audit) — the wizard's elevated-consent…, THE regression. User B finishing user A's consent must not leave a write-scoped…, Fail-closed: unlike login (which may degrade to an unlinked session), a write-…, Happy path must survive the fix — this is the wizard's live Autodesk write…, The identity check is only enforceable because the elevated consent asks for… (+6 more)

### Community 376 - "assistant_context.py"
Cohesion: 0.13
Nodes (19): _assemble_navigation_context(), format_navigation_context(), _monotonic(), _project_name(), datetime, Assistant project context — policy-brokered, fail closed (D1–D5, 2026-09-13).…, The SERVER-RESOLVED hub set a navigation read may touch (B1). ``ModelIndex``…, Candidate models the caller may navigate to: SQL-scoped to ``hub_ids``, capped… (+11 more)

### Community 377 - "emergency_deny_router.py"
Cohesion: 0.18
Nodes (19): _admin_audit(), create_denial(), _deny_out(), _DenyBody, _DenyOut, list_denials(), _now(), _principal_of_current_user() (+11 more)

### Community 378 - "classify_discipline"
Cohesion: 0.17
Nodes (18): classify_discipline(), _counts(), Any, Discipline classification for indexed models (data-driven, filename-free).…, Normalise [{name,count}] dicts / objects-with-.name/.count → {name: count}., Classify a model's discipline from its category list. `cats`: iterable of…, Behavioral tests for aec.discipline — the data-driven discipline classifier.…, test_accepts_object_shape() (+10 more)

### Community 379 - "build_ict_communication_device_rows"
Cohesion: 0.25
Nodes (18): assemble_ict_communication_device_schedule(), build_ict_communication_device_rows(), _mark_sort_key(), Instance-grain, sorted by Mark., _el(), test_description_fallback_plain(), test_description_numbered_key(), test_device_type_numbered_key() (+10 more)

### Community 380 - "_FakeProvClient"
Cohesion: 0.15
Nodes (13): ProvisioningJobStatusHistory, Append-only status-transition log for ProvisioningJob (Audit & History Pattern…, _FakeProvClient, Same race as…, WIZ-5 (2026-07-08 audit): any raise between the claim commit and the outcome…, Minimal injected provisioning client — records nothing, just returns ids., WIZ-1 (2026-07-08 audit): if the reclaim sweeper flips a job to 'failed' while…, test_provision_except_path_does_not_fabricate_history_when_reclaim_already_finalized() (+5 more)

### Community 381 - "test_logging_config.py"
Cohesion: 0.14
Nodes (17): configure_app_logging(), Application logging configuration, isolated from `main` so it is testable.…, Diagnostic obs #6: the application loggers (aec.*, aps.*, …) had no handler, so…, _census(), _logs_under_own_name(), Path, SLOP-LOG-1 (weekly audit 2026-09-11): pins the application's handler set.…, The finding itself, pinned at the record that matters. Deliberately NOT… (+9 more)

### Community 382 - "verify_request"
Cohesion: 0.19
Nodes (18): Slack Assistant Gateway -- request signature verification. Slack's documented…, True iff `signature` is a valid Slack v0 HMAC over (timestamp, raw_body) under…, verify_request(), Slack Assistant Gateway -- request signature verification tests. Pure-function…, hmac.compare_digest raises TypeError on non-ASCII str. Starlette decodes…, int() accepts Unicode whitespace, so "<epoch>\\xa0" survives the parse and the…, A captured valid (secret, timestamp, body, signature) tuple stops verifying…, _sign() (+10 more)

### Community 383 - "test_authz_lifecycle_router.py"
Cohesion: 0.24
Nodes (16): _client(), _FakeSession, fixture, Project-unenrollment purge admin HTTP surface (AUTH-INH plan §7b.10). DB-lane…, WP4: a grantee holds no projection rows, so staling the projection does not…, _stub_counts(), test_unenroll_200_reports_per_subsystem_counts(), test_unenroll_audits_the_share_count() (+8 more)

### Community 384 - "_url"
Cohesion: 0.16
Nodes (20): _audits(), Active member, NOT admin: every owner-admin share route 403s and no share row…, Read reach via a share is NOT authority to share onward., A plain MEMBER (would be 403 with the flag on) gets the same bare 404 as…, test_concurrent_share_requests_one_success(), _go(), test_create_with_download_scope(), test_denied_share_audit_carries_requested_scope() (+12 more)

### Community 385 - "_xs"
Cohesion: 0.14
Nodes (20): other_owns(), Coverage gap (2026-09-23): the export matrix above only proves the…, Sweep 7 (2026-09-16): a grantee firm that ALSO has hub grants of its own must…, SLOP-2: a failed share-access audit write never changes the gate's verdict (no…, SLOP-2 twin for the denial trail: audit_share_denied swallows the write failure…, other_firm owns _PROJ and has shared it read-only with the caller's firm — the…, A grantee admin cannot widen its own share to bytes through the owner route., _set_share_scope() (+12 more)

### Community 386 - "test_filter_observations.py"
Cohesion: 0.16
Nodes (12): captured(), _ctx(), _FakeSession, _NullSession, R5 filter-observation telemetry — behavioral tests. Covers the five required…, Captures the ORM object handed to db.add(); query() raises so the optional…, _run(), test_live_success_records_one_live_observation() (+4 more)

### Community 387 - "test_property_map_cache.py"
Cohesion: 0.17
Nodes (14): _FakePersist, _fresh(), _patch_persist(), WP-A1 (C-Cache-Pattern) characterization test for aec/schema.py's property-map…, Resolve the CURRENT module object from sys.modules. test_schema_persist.py pops…, Reset the module-level property-map cache + any per-key locks. Works against…, _reset_cache(), test_all_none_property_map_not_persisted() (+6 more)

### Community 388 - "test_artifacts_authz.py"
Cohesion: 0.25
Nodes (18): Dark-by-default product flag for the Track-2 published-artifacts subsystem…, track2_artifacts_enabled(), _authz(), Track-2 v1 published-artifact read authorization — the fail-closed decision…, test_all_sources_authorized_serves(), test_any_denied_source_denies_whole_artifact(), test_empty_source_set_denies_fail_closed(), test_expired_denies() (+10 more)

### Community 389 - "artifacts_repo.py"
Cohesion: 0.20
Nodes (18): get_artifact(), get_draft(), list_candidate_artifacts_for_audience(), list_firm_artifacts(), _norm(), publish_from_draft(), Any, datetime (+10 more)

### Community 390 - "test_qa_coordination_report_router.py"
Cohesion: 0.20
Nodes (18): get_coordination_report(), The structured Coordination & Health Report payload (JSON) for a model/version…, _call_export(), _call_report(), _cleanup(), _import_parity_rule(), _no_token(), Phase 11.1 — /data/qa/coordination-report endpoint wiring (DB-lane). The report… (+10 more)

### Community 391 - "_check_separate_approver"
Cohesion: 0.27
Nodes (18): _check_separate_approver(), W9 F3 (review-all 2026-09-21 item 6; closes D2's enforcement gap): refuse to…, _clear(), _preflight_state(), parametrize, W9 F3 + F11 (review-all 2026-09-21 items 6 + 11): the D2 boot guard. D2…, Runtime trims (ON); preflight is deliberately stricter and reports the padding…, TLS-terminated-upstream shape: BIMPOSSIBLE_ENV=dev but secure cookies ON is… (+10 more)

### Community 392 - "da4r_tokens.py"
Cohesion: 0.14
Nodes (17): _b64url(), _b64url_json(), build_ssa_assertion(), signer(), Da4rTokenError, exchange_ssa_assertion(), get_lifecycle_token(), Any (+9 more)

### Community 393 - "warn_if_multi_firm_single_relay"
Cohesion: 0.16
Nodes (12): Relay-defer tripwire (2026-08-06 — see PARKED.md, "Relay routing — deliberately…, warn_if_multi_firm_single_relay(), _FakeDb, _FakeQuery, Relay-defer tripwire (2026-08-06 — PARKED.md "Relay routing — deliberately…, Just enough session to answer the tripwire's one count query., A dark surface must not query: db=None would AttributeError on any access, so…, DB lane: two firms, three active memberships + one revoked — the count is by… (+4 more)

### Community 394 - "teams/client.py"
Cohesion: 0.16
Nodes (17): _base(), _connector(), create_direct_conversation(), get_app_token(), post_message(), post_private_message(), Exception, Microsoft Teams Assistant Gateway -- thin wrapper over the Bot Framework… (+9 more)

### Community 395 - "test_assistant_endpoint.py"
Cohesion: 0.17
Nodes (13): _clear_live_pending(), _post_revert(), fixture, Phase 4a: /assistant router + chat endpoint tests. These mount the router on a…, Isolate the in-memory pending-read store between tests (mirrors…, _revert_client(), test_revert_engine_runtime_error_is_500_not_403(), test_revert_flag_off_maps_permission_error_to_403() (+5 more)

### Community 396 - "_flag"
Cohesion: 0.18
Nodes (19): _flag(), _grant_c(), The ceiling half: a firm grant never widens a user Autodesk does not authorise., Every APS artifact read on one model: proxy viewer-class + download-class, and…, The firm holds the hub grant, but THIS user's token does not reach the project., Layer 1 passes but the user's item tip is unanswered: the /aps artifact routes…, _routes(), test_f1_on_entitled_member_with_firm_grant_is_allowed_off_parity() (+11 more)

### Community 397 - "test_change_set_hub_isolation.py"
Cohesion: 0.11
Nodes (15): autodesk_first_entitled(), firm_env(), fixture, APS hub isolation on the change-set READ routes (2026-09-07 Weekly Full Audit,…, Enforcement OFF: a change set the firm owns but whose project is outside its…, Flag ON with the caller's own Autodesk entitlement granted for every project,…, Entitled caller, hub grant scoped to selected projects, NO enrollment row for…, A firm holding exactly one hub grant, acting as the client's user, with two… (+7 more)

### Community 398 - "test_phase5_persistence.py"
Cohesion: 0.13
Nodes (15): _firm_id(), _firm_row(), Phase 5 persistence — view-presets + sheet-annotations endpoints. DB-bound…, At OFF the new project_id param is accepted and the read serves as before., Helper: OFF (default) with no context → inert (returns None), never raises., Helper: SHADOW must never break serving — missing context still serves (no…, Helper: at ENFORCE, a read that can't be keyed (missing project_id or…, Seed (get-or-create) a firms row matching get_firm_id() so the firm-scoped FK… (+7 more)

### Community 399 - "test_refresh_lock_per_sid.py"
Cohesion: 0.15
Nodes (12): _cleanup(), _expired_session(), P0-A (3rd audit) — the token-refresh lock must be PER-SID, not global. CRIT-3…, Concurrent requests on ONE session must spend the single-use refresh token…, clear_user_session must not leak per-sid locks (unbounded dict otherwise)., Stands in for httpx.AsyncClient: the refresh POST takes ~0.3s., Three different sessions refreshing at once must overlap (~0.3s), not queue…, _SlowClient (+4 more)

### Community 400 - "extract_text"
Cohesion: 0.17
Nodes (16): _extract_docx(), _extract_pdf(), extract_text(), _extract_xlsx(), ExtractionError, Exception, Per-type extraction of uploaded documents to normalized markdown text. Owner-…, Extraction failed; str(exc) is a client-readable reason. (+8 more)

### Community 401 - "test_model_boot_guard.py"
Cohesion: 0.23
Nodes (17): reset_settings_cache(), _check_assistant_model_config(), Model routing slice 1A: fail fast (every posture) when the compiled model…, _clear(), Model routing slice 1A: the boot guard refuses an inconsistent registry /…, The recommended production posture (per-kind defaults PR): Sonnet 5 default +…, The guard re-reads env into the module-level settings cache; monkeypatch…, The guard re-reads env (reset_settings_cache) so a stale cached value from an… (+9 more)

### Community 402 - "revit_context.py"
Cohesion: 0.17
Nodes (12): _Base, _clean(), BaseModel, field_validator, Phase 15c — typed, bounded, injection-safe Revit pane context. The Revit…, Bounded, typed content only — the exact dict that gets rendered., Non-empty, control-char-free, length-clamped string — or None., RevitCloudIdentity (+4 more)

### Community 403 - "_route_handlers"
Cohesion: 0.15
Nodes (10): AsyncFunctionDef, _function_names(), Module, Audit P2-1 regression tests: router.py DRY refactor. Locks in the post-refactor…, Return {endpoint_path: handler_ast_node} for every @router.post-decorated async…, The DRY helper `_dispatch` must exist and the 4 live endpoints must use it., Every live /revit/* endpoint must call _dispatch — no inline try/except., _route_handlers() (+2 more)

### Community 404 - "test_firm_literal_gate_gap.py"
Cohesion: 0.16
Nodes (17): Pattern, _gated(), _live_gate_regex(), _normalize(), T4: pin what the firm-literal semgrep gate catches — and its DELIBERATE…, Python-side mirror of scripts/check-claude-md-gate-sync.mjs so the gap fixture…, Extract the metavariable regex from the live rule file — no hardcoding, so this…, True when semgrep would report this literal (start-anchored, like semgrep). (+9 more)

### Community 405 - "test_wire_contract_vectors.py"
Cohesion: 0.12
Nodes (14): mint(), PipeAttestationError, Exception, revit_link/pipe_attestation.py — pipe-leg attestation for remote…, Base for attestation mint failures (verification lives in the add-in)., Mint a pipe attestation for one document, keyed by one pane session. `now` is…, parametrize, P7 remote-sync security protocol — frozen wire-contract vectors (v1). PAIRED… (+6 more)

### Community 406 - "probe_origin_anomaly.py"
Cohesion: 0.19
Nodes (16): build_report(), classify(), extract_origins_from_pages(), live_guard_error(), main(), OriginSummary, Path, Read-only AEC Data Model origin-anomaly probe (2026-08-25 packet). Settles the… (+8 more)

### Community 407 - "generate.py"
Cohesion: 0.18
Nodes (17): _assert_roundtrip(), find_orphaned_keys(), generate(), main(), Exception, Load the canonical registry, freeze GUIDs, validate, and emit artifacts. Run…, Return (key->guid for the current registry, list of newly-added keys)., Lock entries whose key no longer exists in the current registry. Every GUID is… (+9 more)

### Community 408 - "test_aps_discovery_tombstone.py"
Cohesion: 0.24
Nodes (15): _fake_get(), _forbid_index(), _page(), SLOP-APS-1 / SLOP-APS-2 (weekly audit 2026-09-11): a partial or not-ready…, A 202 anywhere under the root poisons the crawl — no partial `rvts`., The owner's empty-tree reconcile (test_cross_firm_write_denial) is unchanged., _rvt(), test_full_pagination_still_concatenates() (+7 more)

### Community 409 - "_stub_phase6"
Cohesion: 0.14
Nodes (13): M-1(b): the hold is finalized (settled) when the stream ends, through the FIFO…, M-1(b): a turn that dies mid-stream still finalizes its hold, once, with reason…, P15-15C behavioral pin: a pane-supplied `revit_context` payload must reach the…, Stub Phase 6 gateway seams (project mode, budget, BYO key)., M-1(b): a hold refused at admission is a typed 429 before any stream, and…, _stub_phase6(), test_chat_reservation_denied_is_typed_429_and_turn_never_runs(), _deny() (+5 more)

### Community 410 - "test_assistant_models_membership_gate.py"
Cohesion: 0.16
Nodes (15): _client(), R2 (2026-09-04 Phase 3/4 remediation) — GET /assistant/models fails closed.…, The seeded active UserFirmMembership (conftest `auth`) → the gate resolves the…, test_models_200_for_active_member(), test_models_401_when_unauthenticated(), test_models_403_when_authenticated_but_unlinked(), _unlink(), PR A (2026-08-06 tenancy triage), Task 5 — /auth role routes fail closed.… (+7 more)

### Community 411 - "test_autodesk_first_aps_share.py"
Cohesion: 0.16
Nodes (16): _never(), _proxy_routes(), Option B / B4 part b + B5 (W4 D2b): the Autodesk-first ceiling on APS / proxy…, No 403-vs-404 oracle and no share_view_only hint: a non-entitled recipient's…, W5 P1F item 2: under the flag a binding whose hub grant is gone is a definitive…, _revoke(), _set_scope(), _shape() (+8 more)

### Community 412 - "test_autodesk_first_unit.py"
Cohesion: 0.15
Nodes (16): parametrize, Option B / B2 — aec.autodesk_first + the flag-gated branch of…, _scope(), test_cache_keys_never_hold_the_raw_token(), test_content_cache_scope_is_empty_off_and_per_user_on(), _body(), test_expired_entitlement_is_reprobed(), _body() (+8 more)

### Community 413 - "_models"
Cohesion: 0.12
Nodes (18): _deny_detail(), _models(), parametrize, R18 item 3: every owner-facing share payload (create / list / patch / revoke)…, Caller's firm has NO reach of _PROJ at all (other_firm owns it)., A project the owner's hub cache has never seen: the gate must fall through to…, BUG-SHARED-PROJECT-MODEL-PAGE-NO-HUB-ID regression: the grantee's link carried…, No query → the firms this firm has EVER shared with or been shared by (so the… (+10 more)

### Community 414 - "test_firm_docs_upload_gaps_dblane.py"
Cohesion: 0.34
Nodes (16): _as(), _docs_root(), _firm(), _member(), fixture, DB-lane gap coverage for POST /firm-docs (upload), 2026-09-23. Complements…, _raw_files(), _rows() (+8 more)

### Community 415 - "sync_project_roles"
Cohesion: 0.15
Nodes (14): _first_present(), _next_offset(), Any, Session, UUID, Phase 3.8 slice 3 — pull ACC project company/role onto firm memberships. READ-…, What one sync run did. Every entry in the ACC response lands in exactly one…, The member list out of one page, or a typed invalid_response. (+6 more)

### Community 416 - "probe"
Cohesion: 0.15
Nodes (17): main(), Every exposed raw param name per category — the ground truth for fixing a…, The wanted-column config for a wave (the --dry-run view; no auth)., Resolve a lineage/file URN to its tip elementGroup id (the `model_urn` the AEC-…, render_config_markdown(), render_param_dump(), _resolve_model_urn_at_tip(), _waves_arg() (+9 more)

### Community 417 - "test_discipline_field_probe.py"
Cohesion: 0.14
Nodes (11): match_wave(), Match every schedule's columns against the exposed param names for that…, Lowest-risk wave (per _BUILD_ORDER) whose discipline has >=1 model present.…, recommend_pilot_wave(), render_wave_markdown(), ScheduleResult, Pure-core tests for the discipline field-exposure probe (Waves 10-17). Runs in…, test_match_wave_returns_a_result_per_column() (+3 more)

### Community 418 - "load_firm_policy"
Cohesion: 0.22
Nodes (15): load_firm_policy(), UUID, Per-firm model routing policy persistence (model routing slice 2). Translates…, Return (policy, revision_id). revision_id is None when no row exists (the…, Upsert the firm's policy row. Caller (the router) validates member_selection…, save_firm_policy(), _routing_inputs(), FirmModelPolicy (+7 more)

### Community 419 - "build_ict_av_rows"
Cohesion: 0.21
Nodes (5): assemble_ict_av_schedule(), build_ict_av_rows(), _mark_sort_key(), Instance-grain AV-device rows (speakers, projectors, screens, rack-mount AV),…, TestAVSchedule

### Community 420 - "format_health_csv"
Cohesion: 0.24
Nodes (15): _cell(), format_health_csv(), QA model-health report export (Phase 11). Pure formatters that turn a…, None → "" so a missing element_id/param renders blank, not the literal 'None'.…, Render a model-health report as CSV. Layout: a block of `# key: value` context…, _panel_finding(), Phase 11 — model-health report export formatter (pure unit tests). The smoke…, Parse the CSV body, dropping the leading '#'-commented context header. (+7 more)

### Community 421 - "_upsert_model_index"
Cohesion: 0.16
Nodes (12): Lazily index this model so /search/models can find it later. SEC-PDP-MODEL-…, _upsert_model_index(), A stand-in for ``aps.router.resolve_derivative_urn`` -- the server-side…, review-all pass-9 F1 (supersedes the pass-8 #2 cross-project refusal). The…, An upstream failure during resolution is 'unproven', never 'take the caller's…, The other half: a ``file_urn`` that IS the item's resolved derivative persists,…, _resolver(), _valid() (+4 more)

### Community 422 - "spatial_relationships.py"
Cohesion: 0.17
Nodes (16): Classification, level_bands(), ProbePoint, TypedDict, Phase 3.6 — Spatial Relationship Engine v1. A small, PURE (no I/O, no DB, no…, A single-origin element to locate against regions. `xy` None is an affirmative…, The relationship of one probe point to one region., The sorted, dedupe'd set of level elevations across `regions` (A3.2 banding).… (+8 more)

### Community 423 - "TestRevertParameterChange"
Cohesion: 0.14
Nodes (9): AssistantActionLog, Append-only audit log for Phase 4b assistant-driven mutations. Every confirmed…, Adapter-layer role independence: a firm-VIEW editor is NOT a firm-MODEL editor.…, test_apply_parameter_change_requires_model_editor_not_view_editor(), The resume() cancel branch records a `denied` row via log_cancelled_action.…, Gate order mirrors _apply_parameter_change_tool: model-editor role first…, W9-INV-088: drive the spine with a recording ``project_gate`` and report (gate…, TestCancelLogging (+1 more)

### Community 424 - "test_redis_store_ping_probe.py"
Cohesion: 0.14
Nodes (11): RedisStore — redis-py (sync) implementation of SharedStore. (Wave C-1 Phase 0)…, socket, skipif, Wave 3 F1: RedisStore.ping() — the /health readiness probe — must actually…, Minimal RESP server: PONG for PING, a RESP3 map for HELLO, OK otherwise., _read_command(), _RespStub, test_reachable_redis_probe_succeeds() (+3 more)

### Community 425 - "SharedStore"
Cohesion: 0.12
Nodes (10): Protocol, Thin abstraction over a key-value store used for cross-request shared state.…, Return the value for *key*, or None if absent / expired., Store *value* under *key*. If ttl_seconds is given the entry expires…, Delete *key*. Returns True if the key existed, False otherwise., Atomically get and delete *key*. Returns None if absent., Return every live key whose name starts with *prefix*, together with its value.…, Increment a sliding-window counter keyed by *key* with a window of… (+2 more)

### Community 426 - "_PolicyStore"
Cohesion: 0.12
Nodes (8): _PolicyStore, SEC-1/CHAIN-2: two firms on one shared hub, one project, independent policies.…, A recipient firm reaching a shared project must not inherit the owner firm's…, A session that REALLY honours the (firm_id, project_id) filter. SEC-1: a…, Context-manager stand-in for db.session.SessionLocal yielding ``db``., _Session, test_broker_resolver_is_firm_scoped(), test_resolve_policy_is_firm_scoped()

### Community 427 - "test_aps_auth_gate.py"
Cohesion: 0.15
Nodes (15): _auth_mod(), _fake_authed_get(), phase6_gate_overrides(), fixture, parametrize, P1-ζ + GA-H11 — every /aps read must authenticate BEFORE any cache lookup. The…, P1-ζ + GA-H11: the whole /aps read surface rejects sessionless callers., A real in-memory session; returns the cookie dict. No file writes. (+7 more)

### Community 428 - "_as_user"
Cohesion: 0.15
Nodes (15): _as_user(), _scope(), _no_leak(), W6 D5 (ratifies W4 closeout §8.2 + §8.3): view-only = visualization only. The…, W5 P1F item 9: invalidating a user's access also drops THEIR item-tip and URN-…, test_f2_on_item_tip_cache_honours_the_d1_positive_ttl_cap(), test_invalidate_user_access_evicts_the_users_tip_and_binding_proofs(), test_layer1_allow_records_proof_deny_does_not() (+7 more)

### Community 429 - "test_firm_docs_policy_unit.py"
Cohesion: 0.18
Nodes (13): _p(), parametrize, Pure-lane matrix for the CKA document policy (aec/firm_docs/policy.py, Decision…, _read(), test_financial_needs_explicit_grant_never_level(), test_firm_library_is_membership_only(), test_manage_rules(), test_multi_project_cites_only_reachable_projects() (+5 more)

### Community 430 - "test_relationships_durable.py"
Cohesion: 0.16
Nodes (13): _FakeStore, _patch_common(), _patch_persist(), fixture, OD2 Phase 1b — durable version-gated relationships cache. Measured live…, Cold both tiers: run the loop once, then persist the assembled result under the…, OD2 hardening (pool exhaustion): the relationships fetch must commit per-…, In-process stand-in for the durable seam (schema_persist). (+5 more)

### Community 431 - "test_session_store_redis.py"
Cohesion: 0.21
Nodes (16): _auth(), _make_redis_store(), _ok_client(), fixture, Wave C-1 Phase 1 — both-backends equivalence proof for the session-store seam.…, Fake httpx.AsyncClient that returns a successful token rotation response., Resolve the real aps.auth module at call-time (same pattern as existing tests)., Set the active shared-state backend, call reset_store() so the singleton… (+8 more)

### Community 432 - "build_system_blocks"
Cohesion: 0.16
Nodes (15): build_system_blocks(), System prompt as content blocks, in cache-friendly order: [0] STATIC grounding…, test_help_only_request_serializes_without_any_project_context(), test_system_blocks_have_cache_breakpoint_and_grounding(), Phase 15 research (2026-07-15, owner-ratified): the assistant's voice is a…, test_system_blocks_carry_the_flat_professional_voice(), test_system_blocks_do_not_inline_help_content(), test_empty_selection_unchanged() (+7 more)

### Community 433 - "acquire_or_wait"
Cohesion: 0.22
Nodes (14): Run migrations in 'online' mode. In this scenario we need to create an Engine…, run_migrations_online(), acquire_or_wait(), ARCH-7 (2026-06-29 audit) — serialize concurrent Alembic migrators. `alembic…, One non-blocking attempt. True iff this session now holds the lock., Release a previously-acquired lock. True iff a lock was actually held. (Closing…, Acquire the migration advisory lock, polling until acquired or the deadline…, release() (+6 more)

### Community 434 - "load_lock"
Cohesion: 0.14
Nodes (16): derive_guid(), load_lock(), Path, Deterministic, reproducible GUID for a param key., Every key already in the lock must still derive to its locked GUID., The lock must not reference keys that no longer exist (published forever)., gen.find_orphaned_keys is the primitive --check now uses (SP-1)., --check (generate(check_only=True)) must itself catch a lock orphan, not just… (+8 more)

### Community 435 - "test_change_set_review_transitions.py"
Cohesion: 0.20
Nodes (13): _as_user(), _cleanup(), _firm(), _history(), in_review(), _member(), fixture, DB-lane regression tests: the review transitions the web Review controls drive.… (+5 more)

### Community 436 - "test_favorites.py"
Cohesion: 0.21
Nodes (14): _allow_async(), favorites_cleanup(), _put_model(), _put_project(), fixture, /me/favorites — per-user pins (projects + models). Covers: CRUD idempotency,…, SEC-FAV-CROSSFIRM-1: uq_user_favorites_target includes firm_id, so a user…, test_favorites_are_per_user() (+6 more)

### Community 437 - "test_groups_403_ordering.py"
Cohesion: 0.20
Nodes (15): _assert_access_403(), _assert_uniform_not_found(), _deny_access(), foreign_offlist_group(), _make_group(), own_offlist_group(), fixture, SEC-GROUPS-403-ORDERING (2026-08-07) — update_group/delete_group 403 ordering.… (+7 more)

### Community 438 - "test_pane_pairing_index.py"
Cohesion: 0.26
Nodes (15): _count_scans(), _forbid_scans(), _memory_store(), _pair(), fixture, P7 remote-sync security protocol — per-user pane-session index.…, Make any store scan blow up loudly; returns nothing — the test fails on scan., test_expired_session_pruned_from_index_scan_free() (+7 more)

### Community 439 - "test_panel_schedule_preparing.py"
Cohesion: 0.31
Nodes (15): _call_panel(), _cleanup(), _has_failed(), _job_count(), _panel_element(), Phase-5 perf fix — non-blocking /data/elements/panel_schedule contract. Opening…, A minimal but real Electrical Equipment panel element the assembler accepts., _setup() (+7 more)

### Community 440 - "_Store"
Cohesion: 0.12
Nodes (7): fixture, Authenticated personal identity, fake store/db/audit, usage + credential spies.…, Owner-scoped query helpers replaced by spies that record the identity/limit…, personal_conversation_store stand-in, owner-scoped like the real one., _Store, usage_wired(), wired()

### Community 441 - "test_request_context.py"
Cohesion: 0.17
Nodes (10): _drive(), _next(), parametrize, W7.1a — aec.request_context: request-id sanitisation, ContextVar binding, ASGI…, _Req, _Resp, test_middleware_honours_a_safe_inbound_id_and_echoes_it(), test_middleware_mints_when_absent_and_resets_on_error() (+2 more)

### Community 442 - "test_rollout_diagnostics.py"
Cohesion: 0.20
Nodes (13): _env(), _fresh(), no_redis(), fixture, W7.1b — python -m aec.rollout_diagnostics: flag posture, Redis readiness, cache…, test_build_report_from_snapshot_file(), test_build_report_in_process_snapshot(), test_flag_posture_uses_readiness_classifier() (+5 more)

### Community 443 - "TestRevertLegacyProjectBinding"
Cohesion: 0.21
Nodes (5): _bind_legacy_proposal_project(), Stamp a legacy (NULL-project) proposal with the project its first gated revert…, W9 F1 (review-all 2026-09-21 item 1): the D1b project binding for legacy (NULL-…, project_id=None is the flag-off call shape: the legacy row reverts as before…, TestRevertLegacyProjectBinding

### Community 444 - "test_audit_quickwins.py"
Cohesion: 0.15
Nodes (14): derivative_urn_from_item_tip(), is_cacheable_manifest_body(), is_cacheable_metadata_body(), DERIV-3 / N-14: a successful *metadata* (viewable list) body carries NO top-…, DERIV-1: pull the Model Derivative URN (relationships.derivatives.data.id) out…, DERIV-3 / N-14: a Model Derivative *manifest* body always carries a top-level…, Unit tests for the Tier-1 audit quick-win fixes (DERIV-1 / DERIV-3 / SCHEMA-3).…, test_derivative_urn_differs_from_lineage_urn() (+6 more)

### Community 445 - "ChangeSet"
Cohesion: 0.19
Nodes (14): ChangeSet, A named, reviewable batch of staged parameter edits targeting one model., change_set_row(), group_row(), _nowait_refused(), fixture, Row-lock pins for the 2026-09-16 reliability sweep (Track F F1/F2). DB lane…, Source-level: every state-transition handler passes for_update=True and the… (+6 more)

### Community 446 - "_build_fastapi_stub"
Cohesion: 0.21
Nodes (13): Path, _build_fastapi_stub(), Regression: the lightweight FastAPI stub (revit_link/conftest.py) explains…, Build a fresh stub from `_make_fastapi_stub` in revit_link/conftest.py without…, test_fastapi_stub_reports_unsupported_symbol_actionably(), test_fastapi_stub_still_provides_supported_symbols(), test_fastapi_stub_underscore_names_stay_normal_attribute_errors(), _doc_files() (+5 more)

### Community 447 - "circuit_readability_harness.py"
Cohesion: 0.22
Nodes (14): EvalRun, format_report(), frozen_tool_result(), _has_item_per_circuit(), _list_items(), load_fixture(), Circuit-readability eval harness (owner regression 2026-08-16, report-only).…, True iff every fixture circuit has at least one list item carrying its Panel or… (+6 more)

### Community 448 - "test_nl_filter_eval_contract.py"
Cohesion: 0.14
Nodes (3): Deterministic contract tests for the NL-filter eval harness. These run in…, _raw_cases(), test_every_case_satisfies_contract()

### Community 449 - "test_relay_error_map.py"
Cohesion: 0.20
Nodes (12): _client_factory(), _FakeResponse, parametrize, _raise_relay_error(), BIMP-RELAY-ERROR-MAP-GAP (2026-08-25) — relay-level codes TIMEOUT / PIPE_BUSY /…, The raised error's message is the relay's message string verbatim — no request…, Every enum member must have an ERROR_HTTP_STATUS entry (router contract)., test_error_carries_relay_message_only() (+4 more)

### Community 450 - "_client"
Cohesion: 0.17
Nodes (15): _client(), The synthesized tool_result the model receives is the last user message's…, Deterministic fake transport: a matching-document result is ingested, control-…, A result answered from a DIFFERENT document than the read was bound to is never…, A client-reported failure (e.g. Revit offline/busy) is relayed to the model as…, A non-JSON / malformed body (ticket already consumed) becomes a typed…, An over-limit payload is rejected on size BEFORE JSON decoding and mapped to…, test_chat_401_when_unauthenticated() (+7 more)

### Community 451 - "test_assistant_navigation_resolve.py"
Cohesion: 0.26
Nodes (11): _client(), POST /assistant/navigation/resolve — opaque nav handle → in-app destination…, project_id travels in the body (invisible to the route-tenancy walker, like…, test_401_when_unauthenticated(), test_body_validation(), test_model_read_gate_denial_is_403(), test_resolve_requires_project_access(), deny() (+3 more)

### Community 452 - "_reset_caches"
Cohesion: 0.13
Nodes (13): Left-flag spot check: /account/shared-projects under ON is a subset of OFF for…, W5 P1F item 4: under the flag a verified URN binding is a per-user visibility…, W5 P1F2 item A (chained cache): the item tip is fetched at t=0, the URN binding…, W5 SIM fix: every viewer-token answer (legacy token, flag-ON/proxy-OFF 409,…, _reset_caches(), test_f1_shared_projects_on_never_lists_more_than_off(), test_grant_on_not_entitled_admin_gets_one_uniform_403(), test_resolve_binding_per_user_refusal_is_transient_on_stale_off() (+5 more)

### Community 453 - "fixture"
Cohesion: 0.13
Nodes (10): _Aps, assistant_client(), change_sets(), _clean_rows(), fake_digest(), fixture, Fake APS keyed by the CURRENT user's token., Session gates the fake does not model: web session present, diag/auth helpers… (+2 more)

### Community 454 - "_clean_rows"
Cohesion: 0.13
Nodes (13): as_admin(), _clean_rows(), flag_on(), i_own(), other_domain(), other_firm(), fixture, Flag ON + aec.router._require_auth stubbed (the write gate inside… (+5 more)

### Community 455 - "test_multiworker_sim.py"
Cohesion: 0.21
Nodes (14): _make_redis_store(), _noop_sweeper(), _noop_worker(), Event, Wave C-1 Phase 5b — multi-worker safety: prewarm startup orphan-reclaim gate.…, Redis backend: startup reclaim_orphans is NOT invoked (multi-worker safety)., Two independent RedisStore instances share session state (the multi-worker fix)., Return a live RedisStore or None if REDIS_URL is unset/unreachable. (+6 more)

### Community 456 - "test_pane_session_visibility.py"
Cohesion: 0.20
Nodes (13): _memory_store(), _mint(), fixture, B-4: listing and individually revoking pane (Revit) sessions. Makes "which…, An expired-but-not-yet-swept record must not appear — otherwise the UI offers a…, Scoping is by construction: the scan filters on user BEFORE comparing…, test_cannot_revoke_someone_elses_session(), test_expired_records_are_not_listed() (+5 more)

### Community 457 - "test_relationships_singleflight.py"
Cohesion: 0.13
Nodes (13): fixture, OD2 Phase 1a — single-flight on the relationship fetch.…, N-5: the single-flight lock for a key must survive even if that key's cache…, refresh_model used to hand-roll `for k in list(_RELATIONSHIPS_CACHE): if…, Refreshing a model with nothing cached evicts nothing (the count the log line…, N-5 preserved: bulk eviction must not yank a single-flight lock that a caller…, N-6: every cache write must honor the bound. The warm-probe path…, router() (+5 more)

### Community 458 - "test_search_hub_isolation.py"
Cohesion: 0.20
Nodes (13): PR A (2026-08-06 tenancy triage), Tasks 3-4 — /search hub isolation. Two…, Firm is allowed in HUB_A only. A model indexed under HUB_A is returned; an…, UX regression (S&L live smoke 2026-09-13): a discovered-but-never- opened stub…, PROJ_B is cached in HUB_B; the firm is only allowed in HUB_A. hub_id query…, Swap the caller to an unseeded user id (same mechanics as…, require_project_in_firm_hub calls aec.router._require_auth() (a bare `from…, _seed_hubs(), _seed_model() (+5 more)

### Community 459 - "fixture"
Cohesion: 0.13
Nodes (12): _membership_cleanup(), #291: fixtures now seed REAL user_firm_memberships rows so the membership gate…, authed(), client(), db(), _env(), _membership_cleanup(), model_index_cleanup() (+4 more)

### Community 460 - "test_viewer_token.py"
Cohesion: 0.21
Nodes (12): _bind_session(), Phase 5 — APS Viewer wave, B2 + P0-α pt1 / P1-θ: the /aps/viewer-token…, AUTH-INH #11 / DoD #14 (owner option 1): with the backend derivative proxy…, Bind a synthetic session and return the ContextVar reset token., PLAT-4: the Viewer must NOT receive the user's full 3-legged session token…, An already-expired session reports 0, never a negative number., AUTH-INH §7b.3 #4: minting the viewer token records a distinct SERVICE actor…, test_current_token_expires_in_floors_at_zero() (+4 more)

### Community 461 - "build_mechanical_damper_rows"
Cohesion: 0.24
Nodes (4): assemble_mechanical_damper_schedule(), build_mechanical_damper_rows(), Type-grain damper schedule from Duct Accessories, sorted by type name. One row…, TestMechanicalDamperSchedule

### Community 462 - "async_cache.py"
Cohesion: 0.14
Nodes (11): Backward-compatibility shim. `AsyncTTLCache` moved to the neutral…, WP-A1 (C-Cache-Pattern): no-TTL (perpetual) support for AsyncTTLCache. The two…, default_ttl_seconds=None caches forever — second call is served, not…, Concurrent misses on the same key collapse to a single compute (no-TTL path)., A raised exception is not cached (success-only), even with no TTL., Regression guard: the existing float-TTL path is unchanged., test_float_ttl_still_works(), test_none_ttl_failure_not_cached() (+3 more)

### Community 463 - ".get_or_compute"
Cohesion: 0.15
Nodes (8): K, Lock, Drop least-recently-used entries until the size cap is satisfied. F-4: bounds…, Drop the cached entry AND its per-key lock for one key (e.g. after an explicit…, The stored monotonic deadline for `key` (possibly already past), or None when…, Drop every entry (and its per-key lock) whose KEY satisfies `predicate`; return…, Return the cached value for `key` if fresh; otherwise call `compute` (success-…, V

### Community 464 - "store.py"
Cohesion: 0.19
Nodes (9): LockTimeout, Exception, Exceptions for the shared-state subsystem. (Wave C-1 Phase 0) Re-exported from…, Raised by SharedStore.lock() when the distributed mutex cannot be acquired…, Base exception for all shared-state errors., SharedStateError, shared_state — thin seam for cross-request shared state. (Wave C-1 Phase 0)…, Acquire a Redis lock using SETNX spin-acquire. - Token is generated with… (+1 more)

### Community 465 - "test_circuit_readability_eval.py"
Cohesion: 0.14
Nodes (7): skipif, Live, key-gated, REPORT-ONLY circuit-readability eval (owner regression…, Keyless drift guard, same pattern as the nl_filter eval: the pinned model…, Keyless contract check on the frozen fixture: circuit 19 rows with distinct…, test_fixture_is_well_formed(), test_live_eval_runs_and_reports(), test_pinned_model_matches_production()

### Community 466 - "test_aec_token_refresh_classification.py"
Cohesion: 0.23
Nodes (13): aec_client(), _http_status_error(), _patch_token_raises(), prewarm_worker(), Exception, fixture, Regression: a failed token refresh must not leak as a bare 500 out of the AEC…, test_gql_dead_token_400_is_auth_kind() (+5 more)

### Community 467 - "ht"
Cohesion: 0.14
Nodes (11): _Aps, _fresh_discovery_caches(), ht(), fixture, Fake APS: hubs per token; project→hub map; optional refusal status., test_flag_off_never_calls_the_user_path(), _body(), test_no_firm_state_is_ever_consulted() (+3 more)

### Community 468 - "test_personal_workspace_migration_downgrade.py"
Cohesion: 0.27
Nodes (12): _executed_sql(), _load(), c7d8e9f0a1b2 downgrade retention guard (slice 5, 2026-09-04). The approved…, Slice 6: count + DDL are one atomic decision under ACCESS EXCLUSIVE, so a…, LOCK TABLE must never name a missing table (that would abort the downgrade),…, _run_downgrade(), test_downgrade_refuses_while_personal_conversations_exist(), test_downgrade_refuses_while_personal_usage_rows_exist() (+4 more)

### Community 469 - "test_search_preparing.py"
Cohesion: 0.35
Nodes (13): _call_search(), _cleanup(), _has_failed(), _job_count(), OD2 Phase 4.3 — non-blocking /search/elements contract. The cold first-ever…, Patch auth + the warm probe; trip-wire the synchronous fetch so a cold path…, _setup(), test_cold_miss_enqueues_one_job_with_sid_and_returns_preparing() (+5 more)

### Community 470 - "_lf"
Cohesion: 0.14
Nodes (14): _lf(), A Lighting Fixtures element with the given family/type/name + raw params., test_clauses_sorted_by_part_then_id(), test_conditional_clause_excluded_when_no_match(), test_conditional_clause_included_when_element_matches(), test_coverage_counts_explicit_only(), test_efficacy_analysis_flags_below_minimum(), test_efficacy_analysis_passes_efficient_type() (+6 more)

### Community 471 - "test_switchboard_distribution_endpoint.py"
Cohesion: 0.34
Nodes (13): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/switchboard_schedule and GET…, test_distribution_schedule_200_happy_path(), test_distribution_schedule_disallowed_project_returns_403(), test_distribution_schedule_no_match_returns_empty(), test_distribution_schedule_only_distribution_family_in_output(), test_distribution_schedule_upstream_error_returns_502() (+5 more)

### Community 472 - "test_transformer_endpoint.py"
Cohesion: 0.26
Nodes (13): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/transformer_schedule endpoint contract. Mirrors…, Happy path: 200, transformers list, versionNumber stamp., Only Electrical Equipment whose familyName contains 'transformer' is assembled;…, The family-name parser's output reaches the row payload., A model with no transformers → empty transformers list, zero totals., test_transformer_schedule_200_happy_path() (+5 more)

### Community 473 - "test_version_check_worker.py"
Cohesion: 0.25
Nodes (13): _cleanup(), _fake_tip(), _job_status(), _jobs_for_version(), fixture, QA-D2 (2026-07-10 audit) — real behavioral tests for aec.version_check_worker.…, QA-D1: the worker used to call prewarm.enqueue() directly — a bare INSERT ...…, G2 (PDP Slice 0): the worker now re-checks the borrowed sid's firm→hub grant… (+5 more)

### Community 474 - "enqueue"
Cohesion: 0.22
Nodes (12): enqueue(), Insert a pending job; ON CONFLICT (project, model, version, category, kind) DO…, _categories_visible_to_a_fresh_session(), _cleanup(), _dummy_row(), fixture, P1-B (2026-06-06 audit remediation) — prewarm enqueue/reclaim_failed must write…, A TEST-namespaced row to stage (NOT commit) in the caller's session. (+4 more)

### Community 475 - "resolved_backend"
Cohesion: 0.21
Nodes (11): Cross-process async mutex on the redis backend. SET NX PX acquire, jittered…, redis_lock(), ValueError, Configuration helpers for the shared-state store. (Wave C-1 Phase 0; canonical…, ``SHARED_STATE_BACKEND`` holds a value other than memory|redis., Return ``"memory"`` or ``"redis"``; raise :class:`SharedStateConfigError`…, Return the Redis connection URL (default: 'redis://redis:6379/0')., redis_url() (+3 more)

### Community 476 - "_build"
Cohesion: 0.29
Nodes (5): _build(), _decode_segment(), _fake_signer(), Tests for revit_link/da4r_tokens.py - the DA4R two-token scaffold. Everything…, TestSsaAssertionStructure

### Community 477 - "test_aps_dead_lineage.py"
Cohesion: 0.36
Nodes (12): _is_dead_lineage(), _live_item(), WINCHESTER-STALE-LINEAGE-LINK — `list_all_rvts` must not emit dead lineages.…, A normal, openable .rvt lineage: non-Deleted extension + a tip version., test_absent_relationships_block_is_NOT_dead(), test_absent_tip_relationship_is_NOT_dead(), test_deleted_extension_colon_form_is_dead(), test_deleted_extension_dot_form_is_dead() (+4 more)

### Community 478 - "test_authz_child_filtering.py"
Cohesion: 0.19
Nodes (12): Phase 3 (plan v3 §7b.8) — per-child EGRESS filtering for /aps browse lists.…, Make _authz_gate_item_visible deny anything not in `visible_ids` (ENFORCE-like)., Gate returns True for every id (OFF/SHADOW) → the list is returned unchanged., An APS anomaly with no id has no resource identity to hide → passed through…, Must return a NEW list and never mutate the caller's (cached) list in place —…, The cache poisoning guard, expressed behaviourally: filtering the SAME source…, _stub_gate(), test_enforce_drops_denied_children() (+4 more)

### Community 479 - "fixture"
Cohesion: 0.17
Nodes (7): _Aps, as_admin(), _clean(), fixture, Fake APS keyed by the CURRENT user's token: hubs, hub projects, project probe,…, share_chain(), viewer()

### Community 480 - "wiring"
Cohesion: 0.17
Nodes (9): layer1(), fixture, Route the /revert call through the REAL revert_parameter_change (role + flag +…, Role gate passes, the firm-side decision is a recording stub (allow unless told…, real_revert_spine(), wiring(), _load(), _row() (+1 more)

### Community 481 - "test_circuit_endpoint.py"
Cohesion: 0.27
Nodes (12): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/circuit_schedule endpoint contract. Mirrors…, Replace `_load_warm_relationships` (the GA-H5 warm probe) with a stub that…, Happy path: 200, circuits list, versionNumber stamp., Only "Electrical Circuits" elements become rows; other categories excluded.…, A model with no Circuits → empty circuits list, zero totals., test_circuit_schedule_200_happy_path() (+4 more)

### Community 482 - "test_lighting_fixture_endpoint.py"
Cohesion: 0.27
Nodes (12): Make `get_user_token` return a non-empty token so _require_auth passes., _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/lighting_fixture_schedule endpoint contract.…, Happy path: 200, fixtures list, versionNumber stamp., Only Lighting Fixtures category elements are assembled; other categories…, A model with no Lighting Fixtures → empty fixtures list, zero totals., test_lighting_fixture_schedule_200_happy_path() (+4 more)

### Community 483 - "test_electrical_equipment_endpoint.py"
Cohesion: 0.27
Nodes (12): A GENUINE upstream failure (typed AecUpstreamError) is mapped to 502. GA-M2:…, _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/electrical_equipment_schedule endpoint contract.…, Happy path: 200, equipment list, versionNumber stamp., Only Electrical Equipment category elements are assembled; other categories…, A model with no Electrical Equipment → empty equipment list, zero totals., test_electrical_equipment_schedule_200_happy_path() (+4 more)

### Community 484 - "test_guard_emergency_deny.py"
Cohesion: 0.27
Nodes (12): _call(), _denial(), fixture, Pure tests for break-glass emergency-deny wiring in the derived-read guard…, Force the projection to ALLOW (so any block is provably the emergency path),…, test_empty_firm_id_normalizes_to_none_on_emergency_audit_row(), test_flag_off_never_runs_emergency_lookup(), test_flag_on_lookup_error_fails_closed() (+4 more)

### Community 485 - "test_issues_probe_route.py"
Cohesion: 0.22
Nodes (10): probe_app(), install(), fixture, parametrize, HTTP surface of the R1 issue-join probe (aec/issues_probe router).…, test_other_upstream_failures_become_a_labelled_502(), test_required_query_params_are_declared(), test_success_passes_the_probe_verdict_through() (+2 more)

### Community 486 - "test_nl_filter_contract_boundary.py"
Cohesion: 0.23
Nodes (11): _call(), model(), parametrize, POST /data/nl_filter — post-model translation boundary (deterministic).…, Fake the async client; `model["raw"]` is what the model 'returns'., `column_values` (grounding vocabulary) is client-supplied too; a key there that…, test_column_values_keys_do_not_widen_the_field_allowlist(), test_in_contract_output_passes_through_unchanged() (+3 more)

### Community 487 - "test_schedule_pool_coverage.py"
Cohesion: 0.26
Nodes (12): _categories_missing_from_pool(), _literal_block(), _pool_categories(), _quoted(), SCH-H1 guard (2026-07-01 audit): every category a pool-schedule endpoint…, Text of the bracketed literal following the first `marker` (balanced on the…, The full warm-pool category union, parsed from source (mirrors the runtime…, (rule_id, category) pairs whose category isn't in the warm pool.… (+4 more)

### Community 488 - "test_version_check_worker_authfail.py"
Cohesion: 0.29
Nodes (12): _auth_failing_probe(), _cleanup(), _ok_probe(), fixture, T3a regression tests for aec.version_check_worker's auth-failure handling (APS-…, G2 (PDP Slice 0): the worker fails closed on a sid with no session; these tests…, _read(), _seed() (+4 more)

### Community 489 - "assistant_write_reclaim_worker.py"
Cohesion: 0.27
Nodes (11): proposal_retention_days(), purge_proposals_older_than(), ARCH-NEW-1 (2026-07-13 audit): delete assistant_parameter_proposals rows…, purge_aged_proposals(), Event, Periodic maintenance sweep for the assistant_parameter_proposals table: reclaim…, ARCH-NEW-1: one retention-purge pass in its own short session. Cheap indexed…, start() (+3 more)

### Community 490 - "tool_check_model_health"
Cohesion: 0.26
Nodes (11): Run the read-only QA rules over the WHOLE model and return a COMPACT health…, Best-effort topology pass: an advisory graph add-on must never break the core…, _safe_topology(), tool_check_model_health(), _call(), _cleanup(), _ctx(), Phase 11 — check_model_health assistant tool (DB-lane). Mirrors test_qa_router:… (+3 more)

### Community 491 - "_FakeSession"
Cohesion: 0.23
Nodes (7): _persist_durable_evidence(), Persist anomaly (unknown-job) evidence through an INDEPENDENT, self-committing…, _FakeSession, _install_fake_session_layer(), test_persist_durable_evidence_commits_and_closes(), test_persist_durable_evidence_rolls_back_and_swallows_on_failure(), _unknown_record()

### Community 492 - "model_picker.py"
Cohesion: 0.27
Nodes (11): find_project_model(), list_project_models(), list_project_models_in_hubs(), ModelChoice, Model picking for chat-platform gateways (aec/model_picker.py). Extracted from…, Models in `project_id` whose name matches `name_query` (case-insensitive).…, A pickable model, detached from the DB session on purpose. Callers invoke these…, Models BIMpossible has already SEEN in this project, most-recent first. Same… (+3 more)

### Community 493 - "model_resolve.py"
Cohesion: 0.17
Nodes (11): guids_match(), normalize_guid(), order_projects_hint_first(), Phase 15 Wave A2.1 -- pure helpers for reverse cloud-model resolution. The…, Canonical lowercase hyphenated GUID, or None if it isn't one. Accepts brace-…, The A2.1 matching rule: modelGuid must match; projectGuid, when BOTH sides have…, Scan order: the pane's hint (its current/saved project) first, so the common…, test_guids_match_rules() (+3 more)

### Community 494 - "backfill_authz_projection.py"
Cohesion: 0.21
Nodes (11): MemberFact, ProjectResources, apply_guard(), build_parser(), _gather_firm_facts(), main(), ArgumentParser, Namespace (+3 more)

### Community 495 - "test_assistant_authz_gate.py"
Cohesion: 0.23
Nodes (9): _call(), _FakeSession, fixture, Pure tests for the assistant's model read-gate ordering (AUTH-INH Phase 3 +…, test_enforce_runs_guard(), test_off_and_no_emergency_is_zero_cost(), test_off_with_emergency_engaged_still_runs_guard(), test_shadow_runs_guard() (+1 more)

### Community 496 - "test_assistant_error_sanitized.py"
Cohesion: 0.26
Nodes (7): _Block, _collect(), FakeClient, FakeMessages, _msg(), P1-alpha: a failing tool's exception text (which can carry SQL fragments, file…, test_tool_failure_error_is_sanitized()

### Community 497 - "test_auth_status_resilience.py"
Cohesion: 0.29
Nodes (11): _http_status_error(), _patch_token_raises(), Exception, fixture, Perp-audit PLAT-3 — /auth/status must not destroy a valid session on a…, spies(), test_clears_session_on_invalid_grant_400(), test_clears_session_on_invalid_grant_401() (+3 more)

### Community 498 - "test_conftest_router_skip_detector.py"
Cohesion: 0.24
Nodes (10): conftest(), _dec(), fixture, Pin for the stale-router-skip detector in conftest.py (2026-09-16 sweep, S7).…, The tests/conftest.py plugin object (not importable by name under pytest)., test_db_lane_router_skip_becomes_failure(), test_legacy_wording_is_also_caught(), test_only_setup_phase_and_only_skips() (+2 more)

### Community 499 - "test_probe_origin_anomaly.py"
Cohesion: 0.29
Nodes (7): _el(), _page(), Dry-run coverage for backend/scripts/probe_origin_anomaly.py (origin-anomaly…, test_classify_inherent_when_affected_all_none_and_control_healthy(), test_classify_transient_when_affected_gained_origins(), test_dry_run_transient_fixture(), test_extract_distinguishes_none_from_absent()

### Community 500 - "test_receptacle_endpoint.py"
Cohesion: 0.30
Nodes (11): _patch_fetch(), _patch_token(), Wave 4.8 — GET /data/elements/receptacle_schedule endpoint contract. Mirrors…, Happy path: 200, receptacles list, versionNumber stamp., Only Electrical Fixtures category elements are assembled; other categories…, A model with no Electrical Fixtures → empty receptacles list, zero totals., test_receptacle_schedule_200_happy_path(), test_receptacle_schedule_disallowed_project_returns_403() (+3 more)

### Community 501 - "test_relationships_memory.py"
Cohesion: 0.20
Nodes (10): _patch_tip(), fixture, GA-H3 (2026-06-09 audit) — assembled-relationships blobs: memory + event-loop…, _fetch_all_elements_for_relationships' _compute: both the durable-tier read and…, One entry can be a whole model's element set (hundreds of MB on the firm's…, _load_warm_relationships durable read: deserializing the hundreds-of-MB JSONB…, router(), test_cache_cap_defaults_to_three() (+2 more)

### Community 502 - "is_firm_model_editor_open"
Cohesion: 0.27
Nodes (8): is_firm_model_editor_open(), Env bootstrap for the model-editor permission, used only when no user_roles row…, parametrize, Wave 2 O7: BIMPOSSIBLE_FIRM_MODEL_EDITOR_OPEN is documented fail-closed, but…, test_everything_else_stays_closed(), test_truthy_values_open(), test_unset_is_closed(), TestIsFirmModelEditorOpenLegacy

### Community 503 - "run_topology_checks"
Cohesion: 0.33
Nodes (10): _finding(), Same shape as aec.qa.engine._finding so consumers never special-case topology., Graph-based health findings over the electrical distribution: feeder loops…, run_topology_checks(), el(), Behavioral tests for aec/qa/topology.py — graph-based Model Health checks.…, test_topology_checks_clean_model_has_no_findings(), test_topology_checks_flag_loop_island_and_unconnected() (+2 more)

### Community 504 - "generate_xlsx"
Cohesion: 0.20
Nodes (10): _cell_value(), generate_xlsx(), Wave 5 — XLSX export engine. Wraps xlsxwriter (BSD-2) for the synchronous <…, Build an XLSX workbook in memory and return the raw bytes. Numeric cells use…, Numeric fields in format_specs must be written as real number cells., Grouped output produces more rows than ungrouped (group header rows added)., test_generate_xlsx_grouped_has_multiple_rows(), test_generate_xlsx_numeric_cell_not_string() (+2 more)

### Community 505 - "world"
Cohesion: 0.18
Nodes (5): _Bytes, Both firms, both projects, proxy mode on, share row for PROJ_B (granted with…, C2 binding intact under ON: a token for PROJ_A/ITEM_A is not honoured for…, test_viewer_bearer_minted_for_one_model_does_not_stream_another_under_on(), world()

### Community 506 - "_run"
Cohesion: 0.20
Nodes (10): W4 sec-fix F1: entitlement is a ceiling, never a substitute — an entitled user…, _run(), test_current_user_scope_carries_token_expiry(), _body(), test_current_user_scope_fails_closed_without_a_user_id(), _body(), _resolve(), test_flag_on_read_is_the_users_autodesk_access_intersected_with_the_firm() (+2 more)

### Community 507 - "test_data_routes_require_hub_id.py"
Cohesion: 0.31
Nodes (8): _params(), _patch(), fake_token(), BUG-SHARED-PROJECT-MODEL-PAGE-NO-HUB-ID (2026-09-13) — /data/elements and…, test_categories_empty_hub_id_is_422(), test_elements_empty_hub_id_is_422_not_preparing(), test_elements_missing_hub_id_is_422(), test_elements_non_empty_hub_id_still_reaches_resolver()

### Community 508 - "test_groups_views_personal_samefirm_existence_oracle.py"
Cohesion: 0.27
Nodes (10): The oracle test proper: both probes must be indistinguishable., _assert_pair_hidden(), colleague_personal_group(), colleague_personal_view(), fixture, SEC-GROUPS-VIEWS-PERSONAL-SAMEFIRM-EXISTENCE-ORACLE (2026-08-22) — status-code…, test_delete_group_personal_samefirm_pair(), test_delete_view_personal_samefirm_pair() (+2 more)

### Community 509 - "test_hub_id_query_min_length.py"
Cohesion: 0.24
Nodes (8): _hub_id_query_fields(), _min_length(), Every required ``hub_id`` query parameter rejects the empty string (422). #663…, Every ``hub_id`` query ModelField in the resolved dependency graph., End-to-end on one route that only gained ``min_length=1`` here (the…, test_empty_hub_id_is_422_on_a_route_constrained_by_this_sweep(), test_every_required_hub_id_query_param_rejects_empty(), _walk()

### Community 510 - "test_migration_firm_doc_capability_live_unique.py"
Cohesion: 0.36
Nodes (10): _index_names(), _load(), fixture, Wave 4 C3 — migration e5f6a7b8c9d1 (live firm-doc capability unique index),…, _rows(), _run(), scratch_conn(), _seed() (+2 more)

### Community 511 - "test_provider_tool_use_is_refused_closed"
Cohesion: 0.25
Nodes (7): _Block, _FakeClient, _Resp, test_provider_request_carries_no_tools(), test_provider_tool_use_is_refused_closed(), _Usage, _build()

### Community 512 - "_chat"
Cohesion: 0.24
Nodes (9): _chat(), _events(), parametrize, test_firm_scope_denied_before_credential(), test_missing_key_is_credential_unavailable_no_fallback(), test_own_conversation_resumes_and_lists(), test_provider_error_yields_error_row_and_no_fallback(), __init__() (+1 more)

### Community 513 - "test_tip_cache.py"
Cohesion: 0.29
Nodes (10): _clear_tip_cache(), _fake_gql(), fixture, Wave 4.6.5 Session 2 — version-probe TTL cache tests (aec/client.py).…, test_concurrent_misses_collapse_to_one_probe(), test_distinct_keys_probe_independently(), test_expired_entry_reprobes(), test_failure_is_not_cached() (+2 more)

### Community 514 - "aadf3ce41b1c_user_roles_firm_scoped_pk.py"
Cohesion: 0.31
Nodes (9): downgrade(), _primary_key(), UUID, user_roles primary key becomes (user_uuid, firm_id) — firm-scoped roles (W5…, (constraint name, key columns in key order); (None, ()) when there is no…, (reason, removed-row values, audit target) for every row the C3 cascade would…, _stale_rows(), upgrade() (+1 more)

### Community 515 - "c7d8e9f0a1b2_add_personal_workspace.py"
Cohesion: 0.33
Nodes (9): _count(), downgrade(), _has_column(), _has_table(), PersonalDataPresent, RuntimeError, Model routing slice 4: isolated personal BYOK workspace. 1.…, Raised by downgrade() instead of deleting personal rows. (+1 more)

### Community 516 - "_give_hub"
Cohesion: 0.36
Nodes (9): _admin_app(), _aurl(), _give_hub(), Without a verified admin identity every twin is refused before the handler runs…, test_platform_admin_patch_requires_admin(), test_platform_admin_patches_scope_on_owners_behalf(), test_platform_admin_routes_dark_when_flag_off(), test_platform_admin_share_crud_on_owners_behalf() (+1 more)

### Community 517 - "test_element_counts_endpoint.py"
Cohesion: 0.51
Nodes (9): _call(), F5 — /aps element-counts: badges for unprocessed .rvt files. The file browser…, _setup(), test_aec_error_degrades_to_null_without_aborting_batch(), test_cached_model_returns_count_without_live_fetch(), test_live_fetch_cap_bounds_upstream_calls(), test_uncached_model_fetches_and_sums(), test_untranslated_model_is_null() (+1 more)

### Community 520 - "test_synthetic_load_host_guard_pure.py"
Cohesion: 0.27
Nodes (8): hg(), _no_override(), fixture, parametrize, CQ-SYNTH-HOST-ENV-1 guard, dependency-free (Wave 3 D).…, test_loopback_hosts_are_accepted(), test_non_loopback_or_unparseable_hosts_refuse_to_start(), test_only_exact_one_opts_into_a_remote_host()

### Community 521 - "_icons"
Cohesion: 0.22
Nodes (6): _IconClient, _icons(), _tok(), test_project_type_icons_degrade_to_defaults_on_admin_api_refusal(), test_project_type_icons_never_fail_the_listing(), test_project_type_icons_use_the_app_token_and_page()

### Community 522 - "acc_roles_router.py"
Cohesion: 0.31
Nodes (8): _http_error_for(), HTTPException, post, UUID, Phase 3.8 slice 3 — POST /data/acc/sync-roles. Firm-admin-triggered, read-only-…, Map a typed sync failure to an admin-facing status. A 403 from Autodesk means…, Refresh acc_company_id / acc_company_name / acc_role on this firm's active…, sync_acc_roles()

### Community 523 - "preview_current_parameter_value"
Cohesion: 0.28
Nodes (6): preview_current_parameter_value(), Pull the target document_title + element category out of the request selection…, Best-effort CURRENT live value for the approval card's before/after display…, _require_write_context(), preview_current_parameter_value is display-only and best-effort: ANY failure…, TestPreviewCurrentParameterValue

### Community 524 - "health.py"
Cohesion: 0.25
Nodes (8): datetime, timedelta, Projection-health observability (plan v3 §7b.9) — the read-only signals the…, Summarize projection rows for a scope. ``rows`` is ``(sync_state, synced_at)``…, summarize_projection_health(), test_health_all_current_and_fresh_is_healthy(), test_health_empty_scope_is_healthy_with_no_rows(), test_health_flags_stale_and_past_sla()

### Community 525 - "distance_to_footprint"
Cohesion: 0.22
Nodes (9): bbox_hit(), distance_to_footprint(), footprint_bbox(), _has_usable_loop(), True if (px,py) is within `margin` of the bbox. A None bbox disables the pre-…, Shortest distance from (px,py) to any edge of any loop. `math.inf` for an empty…, Point2D, test_distance_to_footprint_zero_on_edge_positive_outside() (+1 more)

### Community 526 - "generate"
Cohesion: 0.31
Nodes (8): RSAPrivateKey, generate(), _key(), main(), _name(), Path, A throwaway certificate authority for the simulation's fake Autodesk. The…, Write ``ca.pem``, ``server.pem`` and ``server.key`` into *out_dir*. Returns the…

### Community 527 - "revit_link/conftest.py"
Cohesion: 0.36
Nodes (8): _install_stubs(), _make_aiohttp_stub(), _make_aps_auth_stub(), _make_fastapi_stub(), _make_pydantic_stub(), _make_sqlalchemy_stub(), Pytest stubs for backend packages not installed in the host Python environment.…, Build a minimal SQLAlchemy-shaped stub tree.

### Community 528 - "TestLifecycleToken"
Cohesion: 0.33
Nodes (4): WorkItem create/monitor/cancel auth = the 2-legged app token, via the existing…, AUTH-INH §7b.3 #4: minting the lifecycle badge records a distinct SERVICE actor…, No session in scope yet (engine unwired) ⇒ token still mints, no row staged., TestLifecycleToken

### Community 530 - "test_failed_compute_does_not_leak_its_lock"
Cohesion: 0.22
Nodes (8): compute() raises → nothing stored, and no orphaned per-key lock either., Dropping the lock must not break single-flight for callers already waiting., test_failed_compute_does_not_leak_its_lock(), scenario(), _boom(), test_failed_compute_still_single_flights_concurrent_callers(), scenario(), _call()

### Community 531 - "test_authz_audit_firmid_normalization.py"
Cohesion: 0.36
Nodes (8): _capture(), parametrize, AUTHZ-AUDIT-FIRMID-EMPTY-ROOTCAUSE — the two Track-2 read-audit producers must…, Patch record_decision where _record_read looks it up (imported lazily from…, test_artifacts_real_firm_round_trips(), test_artifacts_unresolved_firm_becomes_null(), test_track2_content_real_firm_round_trips(), test_track2_content_unresolved_firm_becomes_null()

### Community 533 - "test_backfill_apply_guard.py"
Cohesion: 0.22
Nodes (3): fixture, Pure tests for the Option B guard on scripts/backfill_authz_projection.py…, script()

### Community 534 - "test_smoke_boot.py"
Cohesion: 0.31
Nodes (8): _client(), Smoke test — the app boots and its core anonymous surface answers. Not a…, App imports, routers mount, and the unauthenticated identity probe answers. A…, The login poll the frontend hits on every page load before sign-in. A 401/403…, /health pings the database; in the DB lane Postgres is up, so it must be 200. A…, test_app_boots_and_whoami_answers(), test_auth_status_anonymous_is_200_not_401(), test_health_reports_db_reachable()

### Community 535 - "_views_wiring"
Cohesion: 0.28
Nodes (8): parametrize, W9-INV-085: an APS error envelope answered with HTTP 200 used to be relayed as…, W9-INV-086: a 304 without Vary let a shared cache treat per-caller variants as…, test_304_carries_the_same_vary_as_the_200(), test_non_state_upstream_envelope_is_502_not_a_200(), test_translation_state_envelope_is_200_no_store(), _views_wiring(), _upstream()

### Community 537 - "BuildingTypesTests"
Cohesion: 0.22
Nodes (3): BuildingTypesTests, Pure-lane tests for ``wizard.templates``. Stdlib ``unittest`` only — no pytest,…, Forma building-type vocabulary for the Project Setup Wizard (Phase 8).…

### Community 538 - "_member"
Cohesion: 0.36
Nodes (8): _extract_role(), Role text, verbatim. A member with several ACC roles gets them joined —…, _member(), C2 — don't collapse distinct facts. Keeping only the first role would silently…, test_a_member_with_no_role_yields_none_not_an_empty_string(), test_multiple_roles_are_all_kept(), test_role_is_stored_verbatim_with_no_vocabulary_mapping(), test_scalar_role_field_is_accepted_as_a_fallback()

### Community 539 - "c4e7a2b91d38_staged_change_family_type_target.py"
Cohesion: 0.54
Nodes (7): downgrade(), _has_column(), _has_constraint(), _has_index(), _has_unique_constraint(), Write Engine Increment 2 — family-TYPE targeting (String-only) Adds…, upgrade()

### Community 540 - "test_aec_module_identity.py"
Cohesion: 0.32
Nodes (7): _module_identity_mismatches(), Module-identity invariant for the `aec` package (2026-09-02, Phase 4 xdist…, Return one line per `aec.*` submodule whose sys.modules entry and parent-…, After collection, `sys.modules['aec.<x>']` and `aec.<x>` must be the same…, Self-check: reproduce the historical condition in isolation (pop a pure…, test_aec_submodules_share_one_identity(), test_detector_catches_a_stale_parent_attribute()

### Community 541 - "test_assistant_query_edit_log.py"
Cohesion: 0.25
Nodes (4): _NullSession, Phase 7 audit-gate: query_edit_log assistant tool. Read-only tool: queries…, The handler must open its DB access via ctx.session(), matching every other DB-…, test_query_edit_log_uses_ctx_session()

### Community 543 - "_decide"
Cohesion: 0.29
Nodes (7): _decide(), Review L3: a project confirmed by the user's own hub listing or entitlement-…, test_listing_ceiling_records_proof_so_share_authority_serves_entitled_rows(), _listing_then_decide(), test_share_decision_on_abstains_without_the_grantees_layer1_proof(), _proved(), test_share_decision_on_unreadable_proof_fails_closed_off_unchanged()

### Community 544 - "test_migration_aec_schema_cache.py"
Cohesion: 0.39
Nodes (7): _load_migration(), F-8 — the aec_schema_cache migration must reconcile indexes, not just the…, Invoke the migration's upgrade() with a mocked op + inspector reporting the…, _run_upgrade_with(), test_cold_start_creates_table_and_both_indexes(), test_table_and_indexes_present_is_a_noop(), test_table_present_but_index_missing_is_reconciled()

### Community 546 - "test_security_batch_a.py"
Cohesion: 0.25
Nodes (3): Security remediation — Batch A behavioral tests (2026-05-30). Covers the…, test_nl_filter_requires_auth(), test_search_models_requires_auth()

### Community 547 - "test_security_c1_sessions.py"
Cohesion: 0.25
Nodes (3): auth(), fixture, SEC-C1 — per-request session isolation. Exercises the new session store +…

### Community 548 - "test_view_only_doc_contract.py"
Cohesion: 0.36
Nodes (7): Path, W6 D5 doc register: the view-only ("read") share is documented honestly, in the…, Read a repo doc; skip loudly (never pass silently) when the docs tree is not…, _read(), _sharing_rows(), test_customer_facing_runbook_states_not_drm(), test_flag_contract_row_matches_the_shipped_view_only_rule()

### Community 549 - "_NetworkFailThenDeleteFailsClient"
Cohesion: 0.25
Nodes (6): _make_job_with_upload(), _NetworkFailThenDeleteFailsClient, A planning job whose plan includes an upload (file) item. build_plan no longer…, Fails the file-upload create with a network-kind error (so the ledger still has…, WIZ-12 (2026-07-08 audit, found reviewing WIZ-2): rollback_result.failed is…, test_provision_network_failure_with_partial_rollback_reports_failed_with_orphan_list()

### Community 550 - "3aa734cda334_model_routing_usage_ledger.py"
Cohesion: 0.71
Nodes (6): _col_exists(), downgrade(), _index_exists(), _insp(), _table_exists(), upgrade()

### Community 551 - "s9t0u1v2w3x4_add_cache_reconcile_state.py"
Cohesion: 0.57
Nodes (6): _columns(), downgrade(), _indexes(), Add cache-reconciliation state/log + model_versions.auth_fail_count APS-Lab R5…, _tables(), upgrade()

### Community 552 - "w3x4y5z6a7b8_fav_firm_key_and_enroll_index.py"
Cohesion: 0.48
Nodes (6): downgrade(), _index_names(), favorites cross-firm unique key + enrollment composite index Revision ID:…, Column list of the named unique constraint, or None if it's absent., upgrade(), _uq_columns()

### Community 553 - "scratch"
Cohesion: 0.29
Nodes (7): Connection, conn(), fixture, conn(), fixture, A connection whose search_path is a fresh scratch schema with old-shape…, scratch()

### Community 554 - "test_generated_artifacts_are_in_sync"
Cohesion: 0.29
Nodes (7): build_seed(), One row per (category, product_field) for the Phase 9 enrichment map. Carries…, decode_spf(), Decode SPF bytes to text, sniffing the leading BOM. Inverse of…, The committed .txt / seed / lock must match a fresh generation (no drift)., test_generated_artifacts_are_in_sync(), test_seed_rows_carry_guid_and_cover_enrichment()

### Community 556 - "test_auth_logout_csrf.py"
Cohesion: 0.29
Nodes (3): PLAT-9 — logout is a CSRF-protected POST; the forgeable GET is gone. The old…, The /auth/ exemption carve-out: an authenticated browser hitting logout WITHOUT…, test_post_logout_with_session_requires_csrf_token()

### Community 558 - "test_no_production_caller_declares_required"
Cohesion: 0.38
Nodes (7): ``share_authority``'s docstring states that the ``required <= VIEW`` ceiling is…, test_no_production_caller_declares_required(), _calls_by_scope(), walk(), _funcs(), _src(), _view_defaulted_params()

### Community 559 - "test_item_tip_without_data_id_is_never_cached_503_on_body_unchanged_off"
Cohesion: 0.29
Nodes (7): parametrize, Nothing cached; the provenance-hub probe or the user's hub listing is…, W5 P1F2 item D: a tip body with no data.id (APS 202 "processing") is never…, W5 P1F2 item D: a 202 "processing" tip says nothing about a durable model-…, test_item_tip_without_data_id_is_never_cached_503_on_body_unchanged_off(), test_on_indeterminate_layer1_denies_with_503_and_serves_nothing(), test_resolve_binding_is_kept_when_the_tip_is_still_processing()

### Community 561 - "_body"
Cohesion: 0.29
Nodes (5): test_flag_on_autodesk_denial_is_final_no_share_no_grant(), _body(), _user_denied(), test_flag_on_write_denied_by_autodesk_even_with_firm_grant(), _body()

### Community 562 - "_body"
Cohesion: 0.29
Nodes (4): _body(), _user_ok(), test_flag_on_write_needs_autodesk_and_firm_capability(), _body()

### Community 563 - "_Autodesk"
Cohesion: 0.38
Nodes (3): _Autodesk, Answers the hub list and single-project probe for whichever user is bound NOW., Stands in for autodesk_first_reads.assert_user_can_see_item (its own suites…

### Community 564 - "_stub_warm_pool"
Cohesion: 0.29
Nodes (4): Serve an empty WARM pool so every export runs its real assembler and returns…, SEC-3: read-scope grantee → 403 share_view_only on every derived export;…, _stub_warm_pool(), test_view_only_grantee_cannot_export_xlsx()

### Community 565 - "_Boom"
Cohesion: 0.29
Nodes (7): _broken(), _Boom, RuntimeError, Stands in for what ``get_2legged_token`` really raises: httpx.TimeoutException…, boom(), item_visible(), tok()

### Community 566 - "test_federated_models.py"
Cohesion: 0.29
Nodes (4): Wave 1 Federated Viewer -- discipline parsing + /federated-models endpoint.…, E3 (2026-08-08): the in-handler allowlist call is gone — the whole project…, test_federated_models_route_carries_project_access_gate(), test_federated_models_shapes_ready_and_untranslated()

### Community 567 - "_fake_token"
Cohesion: 0.38
Nodes (6): _fake_token(), SEC-8: PUT /data/categories/{category}/ref called check_firm_view_editor() with…, test_put_category_ref_editor_succeeds(), test_put_category_ref_non_editor_forbidden(), _auth_token(), _require_auth() (aec.router) gates on get_user_token(); give every test a non-…

### Community 569 - "_category_harness"
Cohesion: 0.29
Nodes (4): _category_harness(), fixture, Stub the AEC DM upstream around the REAL get_or_refresh_category., _tip()

### Community 570 - "_load"
Cohesion: 0.43
Nodes (3): _load(), SEC-SCRIPTS-PERF-1 (2026-08-04 audit): the synthetic-perf seed/teardown scripts…, SyntheticSeedGuardTests

### Community 571 - "_pf"
Cohesion: 0.29
Nodes (7): _pf(), A Plumbing Fixtures element., test_no_efficacy_analysis_for_plumbing(), test_plumbing_floor_mounted_water_closet(), test_plumbing_lavatory_public_vs_residential(), test_plumbing_urinal_inferred(), test_plumbing_water_closet_inferred_from_family()

### Community 572 - "b7c8d9e0f1a2_cka_document_scope_classification.py"
Cohesion: 0.87
Nodes (5): downgrade(), _has_col(), _has_table(), _insp(), upgrade()

### Community 573 - "f5a6b7c8d9e0_add_phase3_10a_room_join_geometry_cache.py"
Cohesion: 0.60
Nodes (5): _column_exists(), downgrade(), Add Phase 3.10a cross-model room join geometry cache Per…, _table_exists(), upgrade()

### Community 574 - "l2m3n4o5p6q7_add_canonical_principals.py"
Cohesion: 0.60
Nodes (5): _column_exists(), downgrade(), Add canonical principals + identity_links + principal_admin_scopes (AUTH-INH…, _table_exists(), upgrade()

### Community 575 - "test_auth_roles_alias.py"
Cohesion: 0.33
Nodes (5): SEC-M4 smoke fix — `GET /auth/roles/me` alias (DB-lane). The Wave 6 permissions…, GET /auth/roles/me returns 200 with the caller's role record (not a 404)., The alias and the canonical /auth/me/roles return identical payloads., test_roles_me_alias_matches_canonical(), test_roles_me_alias_resolves()

### Community 576 - "_body"
Cohesion: 0.33
Nodes (4): W5 P1F item 2: flag on = require_hub_in_firm_allowed AND the user's own hubs., test_require_hub_visible_flag_on_needs_the_firm_grant_and_the_users_hubs(), _body(), _scope_()

### Community 577 - "test_cross_firm_share_detail_strings_frontend_pin.py"
Cohesion: 0.60
Nodes (5): _backend_details(), _frontend_keys(), Cross-side pin for the share error-detail contract (2026-09-16 discovery S10).…, test_every_backend_user_facing_detail_has_plain_language_copy(), test_every_frontend_matched_detail_is_still_emitted_by_the_backend()

### Community 578 - "test_env_example_documents_backend_env_names.py"
Cohesion: 0.53
Nodes (5): _documented(), _names_read_by_backend(), .env.example is the documented runtime-env contract; every name the backend…, test_allowlist_entries_are_still_read(), test_every_backend_env_name_is_in_env_example()

### Community 579 - "test_gunicorn_launch_config.py"
Cohesion: 0.60
Nodes (5): _flag_value(), _gunicorn_cmd(), Pins the gunicorn launch flags in backend/Dockerfile (pure lane, no DB).…, test_keep_alive_outlives_the_proxy_idle_window(), test_worker_timeout_unchanged_by_the_keepalive_fix()

### Community 580 - "test_definitive_tip_404_deletes_the_binding"
Cohesion: 0.33
Nodes (5): Code-review 2026-08-30: an upstream blip (429/5xx/network) during fast-path…, A 4xx from Autodesk (item gone/denied — not 429) is a definitive miss: the…, test_definitive_tip_404_deletes_the_binding(), test_transient_tip_error_keeps_the_binding(), raising_tip()

### Community 581 - "test_perp_audit_plat7_plat10.py"
Cohesion: 0.33
Nodes (4): PLAT-7 (sheet-pdf cache key) + PLAT-10 (federated listing failure isolation).…, PLAT-7: two different sheets with unexpected derivative-path shapes used to…, test_federated_models_isolates_a_failing_resolve(), test_sheet_pdf_cache_key_never_shares_a_sentinel()

### Community 583 - "test_redis_degraded_mode.py"
Cohesion: 0.33
Nodes (4): TST-NEW-1 / RE-NEW-1 (2026-06-29 + 2026-07-06 audits) — a genuinely unreachable…, PLAT-1 (2026-07-10 audit): the handler used to relabel EVERY RedisError…, test_non_transient_redis_error_logs_at_error_with_traceback(), test_redis_outage_during_session_resolution_returns_503()

### Community 584 - "point_in_footprint"
Cohesion: 0.40
Nodes (5): point_in_footprint(), Even-odd rule across every loop (outer boundary + holes) — a point in a hole is…, test_point_in_footprint_hole_is_outside(), test_point_in_footprint_ignores_degenerate_loop(), test_point_in_footprint_inside_and_outside()

### Community 585 - "1f7f44253c51_add_bimpossible_role_to_memberships.py"
Cohesion: 0.80
Nodes (4): _ck_exists(), _col_exists(), downgrade(), upgrade()

### Community 586 - "80af6ebc3df5_firm_scope_ai_context_policy.py"
Cohesion: 0.60
Nodes (4): downgrade(), _has_column(), Firm-scope the AI context policy: project_ai_context_policies (firm_id,…, upgrade()

### Community 587 - "9329a1e7be85_add_slack_gateway_bindings.py"
Cohesion: 0.60
Nodes (4): downgrade(), _exists(), Add Slack assistant gateway binding tables Backs the Slack Assistant Gateway…, upgrade()

### Community 588 - "9c9a59a39d64_staged_change_typed_values.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_constraint(), upgrade()

### Community 589 - "a4c123b1612d_add_firm_model_policy.py"
Cohesion: 0.70
Nodes (4): downgrade(), _insp(), _table_exists(), upgrade()

### Community 590 - "a7c1e93f4b28_add_teams_gateway_bindings.py"
Cohesion: 0.60
Nodes (4): downgrade(), _exists(), Add Microsoft Teams assistant gateway binding tables The Teams sibling of…, upgrade()

### Community 591 - "b24de6f81c35_edit_log_change_set_linkage.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_index(), upgrade()

### Community 592 - "c7d2e9f4a1b6_drop_firm_aps_hub_id.py"
Cohesion: 0.60
Nodes (4): downgrade(), _has_column(), Drop the dead firms.aps_hub_id column (W9-INV-061 / Wave 8 inventory D7,…, upgrade()

### Community 593 - "d2e3f4a5b6c7_add_model_index_deleted_at.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_index(), upgrade()

### Community 594 - "d5f8b3c41e27_revit_link_request_log_firm_id.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_index(), upgrade()

### Community 595 - "e5f6a7b8c9d1_firm_doc_capability_live_unique.py"
Cohesion: 0.60
Nodes (4): downgrade(), _has_index(), One live firm-doc capability grant per (firm, user, capability) — partial…, upgrade()

### Community 596 - "j0k1l2m3n4o5_add_hub_access_scope_and_firm_allowed_projects.py"
Cohesion: 0.80
Nodes (4): downgrade(), _has_column(), _has_table(), upgrade()

### Community 597 - "n4o5p6q7r8s9_add_artifact_drafts_and_provenance.py"
Cohesion: 0.90
Nodes (4): _columns(), downgrade(), _table_exists(), upgrade()

### Community 598 - "q7r8s9t0u1v2_add_authz_decision_actor_type.py"
Cohesion: 0.80
Nodes (4): _columns(), downgrade(), _indexes(), upgrade()

### Community 599 - "r8s9t0u1v2w3_add_identity_link_states.py"
Cohesion: 0.80
Nodes (4): downgrade(), _indexes(), _tables(), upgrade()

### Community 600 - "z8a9b0c1d2e3_rename_assistant_digests_created_at.py"
Cohesion: 0.80
Nodes (4): _col_exists(), downgrade(), _index_exists(), upgrade()

### Community 601 - "test_auth_httpx_timeouts.py"
Cohesion: 0.40
Nodes (3): Source-level guard: every httpx client in the auth path carries an explicit…, N-16: stronger than 'not bare' — every httpx.AsyncClient(...) must pass an…, test_every_httpx_client_in_auth_path_sets_an_explicit_timeout()

### Community 604 - "test_logout_csrf.py"
Cohesion: 0.50
Nodes (4): _deleted_cookies(), P1-H — logout must clear the CSRF cookie alongside the session cookie. The…, Names of cookies the response deletes (Max-Age=0 / expired)., test_logout_clears_session_and_csrf_cookies()

### Community 605 - "test_redis_cutover_doc_targeted_recreate.py"
Cohesion: 0.60
Nodes (4): Pin: the Redis cutover guide never tells the operator to run a plain ``docker…, _read(), test_cutover_guide_has_no_plain_compose_up(), test_cutover_guide_uses_targeted_backend_recreate()

### Community 606 - "caller_rows"
Cohesion: 0.40
Nodes (5): caller_rows(), durable_rows(), fixture, Capture rows staged into the CALLER's txn (known-job path) via…, Capture rows sent to the durable, independent-session path (unknown-job path).

### Community 607 - "EditLogOutcome"
Cohesion: 0.50
Nodes (3): EditLogOutcome, field_validator, One staged edit's outcome from a T4 Apply run. The client names the staged edit…

### Community 608 - "13014695175a_user_api_keys_and_account_audit_log.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 609 - "1f617e094d19_add_project_share_grants.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 611 - "a13cd5e70f24_change_set_applied_audit_fields.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 612 - "a5b6c7d8e9f0_constrain_integration_registration_status.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_constraint(), upgrade()

### Community 613 - "a9b8c7d6e5f4_add_assistant_parameter_proposals.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 614 - "b0c1d2e3f4a5_add_element_cache_origin_absent.py"
Cohesion: 0.83
Nodes (3): _column_exists(), downgrade(), upgrade()

### Community 615 - "b1c2d3e4f5a6_move_is_draft_to_membership.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has(), upgrade()

### Community 616 - "b5d234c2723e_add_firm_billing_timezone.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 617 - "c1d2e3f4a5b6_add_writeback_and_wizard_audit_tables.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 618 - "c4d5e6f7a8b9_add_execution_started_at.py"
Cohesion: 0.83
Nodes (3): _column_exists(), downgrade(), upgrade()

### Community 619 - "c6d7e8f9a0b1_add_firm_onboarding_requests.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 620 - "d1b7e2a9c4f0_add_assistant_parameter_proposals_project_id.py"
Cohesion: 0.83
Nodes (3): _column_exists(), downgrade(), upgrade()

### Community 621 - "d5e6f7a8b9c0_add_model_versions_cached_at_index.py"
Cohesion: 0.83
Nodes (3): downgrade(), _index_exists(), upgrade()

### Community 622 - "d5f8b3c62e49_change_set_approval_reason.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 623 - "d8e9f0a1b2c3_add_client_budget_reservations.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 624 - "e0f1a2b3c4d5_add_firm_allowed_hubs_and_project_hub_cache.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 625 - "e3f4a5b6c7d8_add_qa_history_tables.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 626 - "e6f7a8b9c0d1_add_phase3_8_acc_role_sync.py"
Cohesion: 0.83
Nodes (3): _columns(), downgrade(), upgrade()

### Community 627 - "f13c5e70a0b1_add_change_set_tables.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 628 - "f2b3c4d5e6f7_add_allowed_projects.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 629 - "f4a5b6c7d8e9_add_integration_registration.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 630 - "f7a8b9c0d1e2_add_is_firm_model_editor.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_column(), upgrade()

### Community 631 - "h8i9j0k1l2m3_add_firm_documents.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 632 - "i9j0k1l2m3n4_add_share_snapshots.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 633 - "j0k1permproj_add_permission_projection.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 634 - "k1l2m3n4o5p6_add_authz_decision_log.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 635 - "m3n4o5p6q7r8_add_published_artifacts.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 636 - "o5p6q7r8s9t0_add_track2_content_grants.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 637 - "p6q7r8s9t0u1_add_emergency_deny_scopes.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 638 - "s1t2u3v4w5x6_add_phase5_persistence.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 639 - "t0u1v2w3x4y5_drop_allowed_projects.py"
Cohesion: 0.83
Nodes (3): downgrade(), _has_table(), upgrade()

### Community 640 - "t2u3v4w5x6y7_add_provisioning_jobs.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 641 - "u1v2w3x4y5z6_add_r5_filter_observations.py"
Cohesion: 0.83
Nodes (3): downgrade(), _table_exists(), upgrade()

### Community 642 - "w5x6y7z8a9b0_add_assistant_conversations.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 643 - "x6y7z8a9b0c1_add_assistant_digests.py"
Cohesion: 0.83
Nodes (3): downgrade(), _exists(), upgrade()

### Community 644 - "write_spf_text"
Cohesion: 0.50
Nodes (4): _bool_cell(), Render the registry to Revit SPF text. ``guids`` maps ``param.key -> GUID``…, write_spf_text(), test_spf_roundtrips_without_identity_loss()

### Community 645 - "ChannelBinding"
Cohesion: 0.50
Nodes (3): ChannelBinding, NamedTuple, A channel's resolved binding, detached from the session (same rationale as…

### Community 648 - "test_revert_on_execute_role_gate_is_the_spines_audited_one_and_runs_once"
Cohesion: 0.50
Nodes (3): W9-INV-088: /revert checks the role exactly ONCE -- the spine's audited…, test_revert_on_execute_role_gate_is_the_spines_audited_one_and_runs_once(), _deny()

### Community 649 - "test_revert_on_preview_legacy_null_row_is_allowed_when_the_gate_passes"
Cohesion: 0.50
Nodes (3): test_revert_on_preview_legacy_null_row_is_allowed_when_the_gate_passes(), test_revert_on_preview_matching_project_reaches_the_live_read(), _live()

### Community 651 - "test_refresh_model.py"
Cohesion: 0.67
Nodes (3): N-13: guard the DERIV-1 fix against regression. DerivativeCache rows are keyed…, _refresh_model_body(), test_refresh_model_invalidates_by_derivative_urn_not_lineage()

### Community 652 - "_admin_project_id"
Cohesion: 0.67
Nodes (3): _admin_project_id(), The Admin API takes the bare uuid; the rest of the app carries the Data…, test_admin_project_id_strips_the_dm_prefix()

### Community 689 - "_real_httpx"
Cohesion: 0.67
Nodes (3): fixture, tests/revit_link/conftest.py installs a stub `httpx` into sys.modules at…, _real_httpx()

### Community 693 - "test_transient_upstream_failure_is_503_not_a_denial"
Cohesion: 0.67
Nodes (3): 5xx / 429 / transport from APS is indeterminate: no 403, no eviction of the…, test_transient_upstream_failure_is_503_not_a_denial(), _body()

### Community 694 - "test_ledger_executor_is_fifo"
Cohesion: 0.67
Nodes (3): Settlement scheduled after the turn's usage rows must run after them., test_ledger_executor_is_fifo(), main()

## Knowledge Gaps
- **25 isolated node(s):** `_FakeClient`, `Schedule`, `Wave`, `ModelCapabilities`, `accentColor` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 7456 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **154 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `env_flag()` connect `env_flag` to `auth_router.py`, `test_artifacts_authz.py`, `aec/router.py`, `resolve_posture`, `hash_id`, `guard_derived_read`, `slack/router.py`, `hub_tenancy.py`, `test_identity_link_login.py`, `cache_reconcile.py`, `assistant_schemas.py`, `native_adapter.py`, `autodesk_first_enabled`, `test_assistant_parameter_writes_dblane.py`, `live_filter.py`, `account_router.py`, `teams/router.py`, `assistant_live_read.py`, `test_authz_acl_source.py`, `test_admin_delegation_router.py`, `record_badge_use`, `get_firm_id`, `serving.py`, `test_track2_content_authz.py`, `personal_assistant.py`, `admin_router.py`, `revit_link/router.py`, `test_cold_load_perf.py`, `test_change_set_service.py`, `firm_onboarding.py`, `cross_firm_sharing.py`, `main.py`, `test_editor_recovery_dblane.py`, `test_sync_token.py`, `derivative_proxy.py`, `identity.py`, `admin_delegation_router.py`, `test_artifact_producer.py`, `test_cfgb_posture_and_aps_boot.py`, `is_firm_model_editor_open`, `client_keys.py`, `scheduler.py`, `support_explain.py`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `GateTests` connect `GateTests` to `build_plan`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `ModelIndex` connect `db/models.py` to `_xs`, `FirmAllowedHub`, `aec/router.py`, `test_cross_firm_write_denial.py`, `test_teams_router.py`, `QaAnalysisRun`, `proxy_router.py`, `cross_model_join.py`, `test_slack_router.py`, `get_user_uuid`, `cache_reconcile.py`, `test_autodesk_first_aps_share.py`, `autodesk_first_enabled`, `test_cross_firm_share_api.py`, `_upsert_model_index`, `test_model_index_discovery.py`, `effective_project_access`, `test_autodesk_first_read_paths.py`, `test_artifacts_provenance.py`, `test_slack_pairing_db.py`, `ProjectAiContextPolicy`, `AecUpstreamError`, `share_authority.py`, `digest.py`, `test_pdp_g1_texture_binding_routes.py`, `test_search_hub_isolation.py`, `fixture`, `cross_firm_sharing.py`, `test_artifact_producer.py`, `test_pairing_gate.py`, `test_qa_history_capture_purge.py`, `model_picker.py`, `backfill_authz_projection.py`, `test_teams_pairing_db.py`, `assistant_context.py`, `world`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 104 inferred relationships involving `Firm` (e.g. with `account_me()` and `add_domain()`) actually correct?**
  _`Firm` has 104 INFERRED edges - model-reasoned connections that need verification._
- **Are the 108 inferred relationships involving `UserFirmMembership` (e.g. with `admin_revoke_member_api_key()` and `list_memberships()`) actually correct?**
  _`UserFirmMembership` has 108 INFERRED edges - model-reasoned connections that need verification._
- **Are the 68 inferred relationships involving `ModelIndex` (e.g. with `_project_name()` and `SourceProvenanceError`) actually correct?**
  _`ModelIndex` has 68 INFERRED edges - model-reasoned connections that need verification._
- **What connects `_FakeClient`, `Schedule`, `Wave` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._